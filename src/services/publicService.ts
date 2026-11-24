import { deriveClusterSummary, getSpecificationsDisplay } from './clusterCalculations';
import { serviceDelay } from './delay';
import { initializeDatabase, readCollection } from './storage';
import type { ClusterDetails, ClusterWithSummary } from '../types/serenia';

export async function getPublishedClusters(): Promise<ClusterWithSummary[]> {
  await serviceDelay();
  await initializeDatabase();
  // Replace these localStorage reads with the published clusters API fetch when the backend is available.
  const types = readCollection('propertyTypes');
  return readCollection('clusters')
    .filter((cluster) => cluster.status === 'opened')
    .map((cluster) => ({
      ...cluster,
      summary: deriveClusterSummary(cluster, types),
    }));
}

export async function getPublishedClusterById(id: string): Promise<ClusterDetails | null> {
  await serviceDelay();
  await initializeDatabase();
  // Replace these localStorage reads with the published cluster details API fetch when the backend is available.
  const cluster = readCollection('clusters').find(
    (item) => (item.id === id || item.code === id) && item.status === 'opened',
  );
  if (!cluster) return null;
  const types = readCollection('propertyTypes');
  const propertyTypes = types.filter((type) => type.clusterId === cluster.id);
  return {
    ...cluster,
    summary: deriveClusterSummary(cluster, types),
    propertyTypes,
    specificationsDisplay: getSpecificationsDisplay(cluster, types),
  };
}
