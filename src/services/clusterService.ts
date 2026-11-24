import { collectGarbageInternal } from './fileService';
import { deriveClusterSummary, getSpecificationsDisplay } from './clusterCalculations';
import { serviceDelay } from './delay';
import { readCollection, updateCollections, initializeDatabase } from './storage';
import type {
  Cluster,
  ClusterDetails,
  ClusterHistoryEntry,
  ClusterStats,
  ClusterStatus,
  ClusterWizardPayload,
  ClusterWizardPropertyType,
  ClusterWithSummary,
  PropertyType,
} from '../types/serenia';

const HISTORY_AUTHOR = 'Harrison Wells';

function slugify(value: string): string {
  const slug = value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return slug || 'new-cluster';
}

function nextClusterId(name: string, clusters: Cluster[]): string {
  const base = slugify(name);
  const existing = new Set(clusters.map((cluster) => cluster.id));
  if (!existing.has(base)) return base;
  let suffix = 2;
  while (existing.has(`${base}-${suffix}`)) suffix += 1;
  return `${base}-${suffix}`;
}

function nextClusterCode(name: string, clusters: Cluster[]): string {
  const prefix = name.replace(/[^a-z]/gi, '').slice(0, 3).toUpperCase().padEnd(3, 'X');
  const lastSequence = clusters.reduce((max, cluster) => {
    const sequence = Number(cluster.code.match(/-(\d{3})$/)?.[1] ?? 0);
    return Math.max(max, sequence);
  }, 0);
  return `CL-${prefix}-${String(lastSequence + 1).padStart(3, '0')}`;
}

function withSummary(cluster: Cluster, types: PropertyType[]): ClusterWithSummary {
  return { ...cluster, summary: deriveClusterSummary(cluster, types) };
}

function makePropertyTypes(
  clusterId: string,
  wizardTypes: ClusterWizardPropertyType[],
  existingTypes: PropertyType[],
  timestamp: string,
): PropertyType[] {
  const oldById = new Map(existingTypes.map((type) => [type.id, type]));
  return wizardTypes.map((type) => {
    const existing = oldById.get(type.id);
    return {
      ...type,
      clusterId,
      createdAt: existing?.createdAt ?? timestamp,
      updatedAt: timestamp,
    };
  });
}

function priceText(value: number): string {
  return `$${new Intl.NumberFormat('en-US').format(value)}`;
}

function getDifferences(
  oldCluster: Cluster | null,
  newCluster: Cluster | null,
  oldTypes: PropertyType[],
  newTypes: PropertyType[],
): string[] {
  if (!oldCluster || !newCluster) return [];
  const changes: string[] = [];
  const compare = (label: string, oldValue: string, newValue: string) => {
    if (oldValue !== newValue) changes.push(`Changed the ${label} from "${oldValue}" into "${newValue}".`);
  };

  compare('cluster name', oldCluster.name, newCluster.name);
  compare('tagline', oldCluster.tagline, newCluster.tagline);
  compare('status', oldCluster.status, newCluster.status);
  compare('address', oldCluster.location.address, newCluster.location.address);
  compare('cluster type', oldCluster.specs.clusterType, newCluster.specs.clusterType);
  compare('floor type', oldCluster.specs.floorType, newCluster.specs.floorType);
  compare('door/window type', oldCluster.specs.doorWindowType, newCluster.specs.doorWindowType);
  compare('single floor size', String(oldCluster.specs.singleFloorSize), String(newCluster.specs.singleFloorSize));
  compare('electricity capacity', `${oldCluster.specs.electricityCapacityVa} VA`, `${newCluster.specs.electricityCapacityVa} VA`);
  compare(
    'cluster size',
    `${oldCluster.specs.clusterSize.value} ${oldCluster.specs.clusterSize.unit}`,
    `${newCluster.specs.clusterSize.value} ${newCluster.specs.clusterSize.unit}`,
  );
  compare('stairs', oldCluster.specs.stairs ?? '-', newCluster.specs.stairs ?? '-');
  compare(
    'available property types',
    oldCluster.specs.propertyTypesAvailable.join(', '),
    newCluster.specs.propertyTypesAvailable.join(', '),
  );
  compare('estimated units', String(oldCluster.specs.estimatedUnits), String(newCluster.specs.estimatedUnits));
  compare('estimated property types', String(oldCluster.specs.estimatedTypes), String(newCluster.specs.estimatedTypes));
  compare('sold units', String(oldCluster.unitStatus.sold), String(newCluster.unitStatus.sold));
  compare('on-repair units', String(oldCluster.unitStatus.onRepair), String(newCluster.unitStatus.onRepair));

  const oldById = new Map(oldTypes.map((type) => [type.id, type]));
  const newById = new Map(newTypes.map((type) => [type.id, type]));
  newTypes.forEach((type) => {
    const oldType = oldById.get(type.id);
    if (!oldType) changes.push(`Added property type "${type.name}".`);
    else if (oldType.pricing.basePrice !== type.pricing.basePrice) {
      changes.push(`Changed the base price for "${type.name}" from ${priceText(oldType.pricing.basePrice)} into ${priceText(type.pricing.basePrice)}.`);
    }
  });
  oldTypes.forEach((type) => {
    if (!newById.has(type.id)) changes.push(`Removed property type "${type.name}".`);
  });
  return changes;
}

function makeHistoryEntry(
  oldCluster: Cluster | null,
  newCluster: Cluster | null,
  oldTypes: PropertyType[],
  newTypes: PropertyType[],
  action: 'create' | 'publish' | 'draft' | 'update' | 'status' | 'delete',
  timestamp: string,
): ClusterHistoryEntry {
  const cluster = newCluster ?? oldCluster;
  if (!cluster) throw new Error('A cluster is required to record history.');

  const differences = getDifferences(oldCluster, newCluster, oldTypes, newTypes);
  let description: string;
  if (action === 'delete') {
    description = `Deleted the cluster "${cluster.name}".`;
  } else if (action === 'create') {
    description = `Created the cluster "${cluster.name}" as ${cluster.status}.`;
    if (newTypes.length > 0) description += ` Added ${newTypes.length} property types.`;
  } else if (action === 'draft') {
    description = `Saved "${cluster.name}" as a draft.`;
  } else if (action === 'publish') {
    description = `Published "${cluster.name}".`;
  } else if (action === 'status' && differences.length === 0) {
    description = `Updated the status for "${cluster.name}".`;
  } else if (differences.length > 0) {
    description = differences.join(' ');
  } else {
    description = `Updated the cluster "${cluster.name}".`;
  }

  return {
    id: crypto.randomUUID(),
    clusterId: cluster.id,
    author: HISTORY_AUTHOR,
    createdAt: timestamp,
    description,
  };
}

function buildClusterFromWizard(
  id: string,
  code: string,
  payload: ClusterWizardPayload,
  status: ClusterStatus,
  created: string,
  updated: string,
): Cluster {
  const name = payload.details.name.trim();
  if (!name) throw new Error('Enter a cluster name before saving.');
  return {
    id,
    code,
    name,
    tagline: payload.details.tagline.trim(),
    description: payload.details.description.trim(),
    status,
    location: payload.location,
    specs: payload.specs,
    amenities: payload.amenities,
    media: payload.media,
    nearestPlaces: payload.nearestPlaces,
    unitStatus: { sold: 0, onRepair: 0 },
    createdAt: created,
    updatedAt: updated,
  };
}

function clusterAction(status: ClusterStatus, mode?: 'publish' | 'draft'): 'create' | 'publish' | 'draft' | 'update' {
  if (mode === 'draft') return 'draft';
  if (mode === 'publish') return 'publish';
  return status === 'draft' ? 'draft' : 'update';
}

export async function getClusters(filters: {
  search?: string;
  sort?: 'latest' | 'oldest' | 'name' | 'price';
  status?: ClusterStatus;
} = {}): Promise<ClusterWithSummary[]> {
  await serviceDelay();
  await initializeDatabase();
  // Replace these localStorage reads with a cluster API fetch when the backend is available.
  const clusters = readCollection('clusters');
  const types = readCollection('propertyTypes');
  const query = filters.search?.trim().toLowerCase();
  const results = clusters
    .filter((cluster) => !filters.status || cluster.status === filters.status)
    .filter((cluster) => !query || `${cluster.name} ${cluster.code} ${cluster.tagline}`.toLowerCase().includes(query))
    .map((cluster) => withSummary(cluster, types));

  switch (filters.sort) {
    case 'oldest':
      results.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
      break;
    case 'name':
      results.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'price':
      results.sort((a, b) => (a.summary.priceFrom ?? Infinity) - (b.summary.priceFrom ?? Infinity));
      break;
    case 'latest':
    default:
      results.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
  return results;
}

export async function getClusterById(id: string): Promise<ClusterDetails | null> {
  await serviceDelay();
  await initializeDatabase();
  // Replace these localStorage reads with a cluster details API fetch when the backend is available.
  const clusters = readCollection('clusters');
  const cluster = clusters.find((item) => item.id === id || item.code === id);
  if (!cluster) return null;
  const types = readCollection('propertyTypes');
  const propertyTypes = types.filter((type) => type.clusterId === cluster.id);
  const summary = deriveClusterSummary(cluster, types);
  return {
    ...cluster,
    summary,
    propertyTypes,
    specificationsDisplay: getSpecificationsDisplay(cluster, types),
  };
}

export async function getClusterForEdit(id: string): Promise<ClusterWizardPayload | null> {
  await serviceDelay();
  await initializeDatabase();
  // Replace this localStorage lookup with the cluster editor API fetch when the backend is available.
  const cluster = readCollection('clusters').find((item) => item.id === id || item.code === id);
  if (!cluster) return null;
  const propertyTypes = readCollection('propertyTypes')
    .filter((type) => type.clusterId === cluster.id)
    .map(({ clusterId: _clusterId, createdAt: _createdAt, updatedAt: _updatedAt, ...type }) => type);
  return {
    details: { name: cluster.name, tagline: cluster.tagline, description: cluster.description },
    location: cluster.location,
    specs: cluster.specs,
    amenities: cluster.amenities,
    media: cluster.media,
    nearestPlaces: cluster.nearestPlaces,
    propertyTypes,
    propertyDraft: null,
  };
}

export async function getClusterStats(): Promise<ClusterStats> {
  await serviceDelay();
  await initializeDatabase();
  // Replace these localStorage reads with a dashboard statistics API fetch when the backend is available.
  const clusters = readCollection('clusters').filter((cluster) => cluster.status !== 'draft');
  const types = readCollection('propertyTypes');
  const analytics = readCollection('analytics');
  const summaries = clusters.map((cluster) => deriveClusterSummary(cluster, types));
  return {
    totalClusters: clusters.length,
    totalTypes: summaries.reduce((sum, summary) => sum + summary.totalTypes, 0),
    totalProperties: summaries.reduce((sum, summary) => sum + summary.totalUnits, 0),
    availableUnits: summaries.reduce((sum, summary) => sum + summary.unitStats.available, 0),
    trends: clusters.length === 0
      ? null
      : {
        totalProperties: analytics.trends.properties,
        availableUnits: analytics.trends.availableUnits,
      },
  };
}

export async function createClusterFromWizard(
  payload: ClusterWizardPayload,
  mode: 'publish' | 'draft',
): Promise<ClusterWithSummary> {
  await serviceDelay();
  await initializeDatabase();
  // Replace these localStorage reads and writes with the cluster create API when the backend is available.
  const clusters = readCollection('clusters');
  const allTypes = readCollection('propertyTypes');
  const id = nextClusterId(payload.details.name, clusters);
  const timestamp = new Date().toISOString();
  const status: ClusterStatus = mode === 'publish' ? 'opened' : 'draft';
  const cluster = buildClusterFromWizard(id, nextClusterCode(payload.details.name, clusters), payload, status, timestamp, timestamp);
  const newTypes = makePropertyTypes(id, payload.propertyTypes, [], timestamp);
  const history = makeHistoryEntry(null, cluster, [], newTypes, mode === 'publish' ? 'create' : 'draft', timestamp);
  updateCollections({
    clusters: [...clusters, cluster],
    propertyTypes: [...allTypes, ...newTypes],
    clusterHistory: [...readCollection('clusterHistory'), history],
  });
  return withSummary(cluster, [...allTypes, ...newTypes]);
}

export async function updateClusterFromWizard(
  id: string,
  payload: ClusterWizardPayload,
  mode?: 'publish' | 'draft',
): Promise<ClusterWithSummary> {
  await serviceDelay();
  await initializeDatabase();
  // Replace these localStorage reads and writes with the cluster update API when the backend is available.
  const clusters = readCollection('clusters');
  const oldCluster = clusters.find((cluster) => cluster.id === id || cluster.code === id);
  if (!oldCluster) throw new Error('Cluster not found.');
  const allTypes = readCollection('propertyTypes');
  const oldTypes = allTypes.filter((type) => type.clusterId === oldCluster.id);
  const timestamp = new Date().toISOString();
  const status = mode === 'publish' ? 'opened' : mode === 'draft' ? 'draft' : oldCluster.status;
  const cluster = buildClusterFromWizard(
    oldCluster.id,
    oldCluster.code,
    payload,
    status,
    oldCluster.createdAt,
    timestamp,
  );
  cluster.unitStatus = oldCluster.unitStatus;
  const newTypes = makePropertyTypes(oldCluster.id, payload.propertyTypes, oldTypes, timestamp);
  const action = clusterAction(status, mode);
  const history = makeHistoryEntry(oldCluster, cluster, oldTypes, newTypes, action, timestamp);
  updateCollections({
    clusters: clusters.map((item) => item.id === oldCluster.id ? cluster : item),
    propertyTypes: [...allTypes.filter((type) => type.clusterId !== oldCluster.id), ...newTypes],
    clusterHistory: [...readCollection('clusterHistory'), history],
  });
  return withSummary(cluster, [...allTypes.filter((type) => type.clusterId !== oldCluster.id), ...newTypes]);
}

async function deleteClustersInternal(ids: string[]): Promise<void> {
  if (ids.length === 0) return;
  const idSet = new Set(ids);
  const clusters = readCollection('clusters');
  const removed = clusters.filter((cluster) => idSet.has(cluster.id));
  if (removed.length === 0) return;
  const removedTypes = readCollection('propertyTypes').filter((type) => idSet.has(type.clusterId));
  const timestamp = new Date().toISOString();
  const deletedHistory = removed.map((cluster) => makeHistoryEntry(
    cluster,
    null,
    removedTypes.filter((type) => type.clusterId === cluster.id),
    [],
    'delete',
    timestamp,
  ));
  const priorHistory = readCollection('clusterHistory').filter((entry) => !idSet.has(entry.clusterId));
  const autosave = readCollection('wizardAutosave');
  updateCollections({
    clusters: clusters.filter((cluster) => !idSet.has(cluster.id)),
    propertyTypes: readCollection('propertyTypes').filter((type) => !idSet.has(type.clusterId)),
    clusterHistory: [...priorHistory, ...deletedHistory],
    wizardAutosave: autosave && autosave.clusterId && idSet.has(autosave.clusterId) ? null : autosave,
  });
  await collectGarbageInternal();
}

export async function deleteCluster(id: string): Promise<void> {
  await serviceDelay();
  await initializeDatabase();
  // Replace these localStorage writes with the cluster deletion API when the backend is available.
  await deleteClustersInternal([id]);
}

export async function deleteClusters(ids: string[]): Promise<void> {
  await serviceDelay();
  await initializeDatabase();
  // Replace these localStorage writes with the bulk cluster deletion API when the backend is available.
  await deleteClustersInternal(ids);
}

export async function updateUnitStatus(
  clusterId: string,
  values: { sold: number; onRepair: number },
): Promise<ClusterWithSummary> {
  await serviceDelay();
  await initializeDatabase();
  // Replace this localStorage update with the unit inventory API when the backend is available.
  const clusters = readCollection('clusters');
  const cluster = clusters.find((item) => item.id === clusterId);
  if (!cluster) throw new Error('Cluster not found.');
  const total = deriveClusterSummary(cluster, readCollection('propertyTypes')).totalUnits;
  if (!Number.isInteger(values.sold) || !Number.isInteger(values.onRepair) || values.sold < 0 || values.onRepair < 0) {
    throw new Error('Sold and on-repair counts must be non-negative whole numbers.');
  }
  if (values.sold + values.onRepair > total) {
    throw new Error('Sold and on-repair units cannot exceed the cluster total.');
  }
  const timestamp = new Date().toISOString();
  const updatedCluster = { ...cluster, unitStatus: values, updatedAt: timestamp };
  const history = makeHistoryEntry(cluster, updatedCluster, [], [], 'status', timestamp);
  updateCollections({
    clusters: clusters.map((item) => item.id === cluster.id ? updatedCluster : item),
    clusterHistory: [...readCollection('clusterHistory'), history],
  });
  return withSummary(updatedCluster, readCollection('propertyTypes'));
}

export async function updateClusterStatus(clusterId: string, status: ClusterStatus): Promise<ClusterWithSummary> {
  await serviceDelay();
  await initializeDatabase();
  // Replace this localStorage update with the cluster status API when the backend is available.
  const clusters = readCollection('clusters');
  const cluster = clusters.find((item) => item.id === clusterId);
  if (!cluster) throw new Error('Cluster not found.');
  const updatedCluster = { ...cluster, status, updatedAt: new Date().toISOString() };
  const history = makeHistoryEntry(cluster, updatedCluster, [], [], 'status', updatedCluster.updatedAt);
  updateCollections({
    clusters: clusters.map((item) => item.id === cluster.id ? updatedCluster : item),
    clusterHistory: [...readCollection('clusterHistory'), history],
  });
  return withSummary(updatedCluster, readCollection('propertyTypes'));
}

