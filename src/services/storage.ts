import { clear as clearIndexedDb, createStore } from 'idb-keyval';
import type { StoredCollections } from '../types/serenia';
import { emitDataEvent, type DataScope } from './dataEvents';
import { createSeedData } from './seedData';

export const SCHEMA_VERSION = 2;
export const SCHEMA_VERSION_KEY = 'serenia_schema_version';
export const fileStore = createStore('serenia', 'files');

type CollectionName = keyof StoredCollections;
type CollectionUpdate = Partial<StoredCollections>;

const collectionKeys: Record<CollectionName, string> = {
  clusters: 'serenia_clusters',
  propertyTypes: 'serenia_property_types',
  clusterHistory: 'serenia_cluster_history',
  requests: 'serenia_requests',
  analytics: 'serenia_analytics',
  settings: 'serenia_settings',
  session: 'serenia_session',
  wizardAutosave: 'serenia_wizard_autosave',
};

const collectionScopes: Record<CollectionName, DataScope> = {
  clusters: 'clusters',
  propertyTypes: 'types',
  clusterHistory: 'clusters',
  requests: 'requests',
  analytics: 'analytics',
  settings: 'settings',
  session: 'settings',
  wizardAutosave: 'clusters',
};

let initialization: Promise<void> | null = null;

function isQuotaError(error: unknown): boolean {
  if (!(error instanceof DOMException)) return false;
  return error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED';
}

function storageWriteError(error: unknown): Error {
  if (isQuotaError(error)) {
    return new Error('Storage is full. Remove large files or records, then try again.');
  }
  return error instanceof Error ? error : new Error('Unable to write Serenia storage.');
}

function setLocalStorage(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {
    throw storageWriteError(error);
  }
}

function removeLocalStorage(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    throw storageWriteError(error);
  }
}

function clearSereniaKeys(): void {
  const keysToRemove: string[] = [];
  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index);
    if (key?.startsWith('serenia_')) keysToRemove.push(key);
  }
  keysToRemove.forEach(removeLocalStorage);
}

function writeCollections(updates: CollectionUpdate): void {
  const entries = Object.entries(updates) as [CollectionName, StoredCollections[CollectionName]][];
  const writes = entries.map(([name, value]) => {
    const serialized = JSON.stringify(value);
    if (serialized === undefined) throw new Error(`Unable to serialize Serenia ${name}.`);
    return { key: collectionKeys[name], name, serialized };
  });
  const previous = new Map(writes.map(({ key }) => [key, window.localStorage.getItem(key)]));
  const completed: string[] = [];

  try {
    writes.forEach(({ key, serialized }) => {
      setLocalStorage(key, serialized);
      completed.push(key);
    });
  } catch (writeError) {
    let rollbackFailed = false;
    for (const key of completed.reverse()) {
      try {
        const oldValue = previous.get(key);
        if (oldValue === null || oldValue === undefined) window.localStorage.removeItem(key);
        else window.localStorage.setItem(key, oldValue);
      } catch {
        rollbackFailed = true;
      }
    }
    const error = storageWriteError(writeError);
    if (rollbackFailed) {
      throw new Error(`${error.message} Some earlier values could not be restored; reload before retrying.`);
    }
    throw error;
  }

  entries.forEach(([name]) => emitDataEvent(collectionScopes[name]));
}

async function initializeStorage(): Promise<void> {
  const storedVersion = window.localStorage.getItem(SCHEMA_VERSION_KEY);
  if (storedVersion !== String(SCHEMA_VERSION)) {
    clearSereniaKeys();
    try {
      await clearIndexedDb(fileStore);
    } catch (error) {
      throw storageWriteError(error);
    }
    const seed = createSeedData();
    writeCollections(seed);
    setLocalStorage(SCHEMA_VERSION_KEY, String(SCHEMA_VERSION));
    return;
  }

  const seed = createSeedData();
  const missingCollections: CollectionUpdate = {};
  (Object.keys(collectionKeys) as CollectionName[]).forEach((name) => {
    if (window.localStorage.getItem(collectionKeys[name]) === null) {
      Object.assign(missingCollections, { [name]: seed[name] });
    }
  });
  if (Object.keys(missingCollections).length > 0) writeCollections(missingCollections);
}

export async function initializeDatabase(): Promise<void> {
  if (!initialization) {
    initialization = initializeStorage().catch((error: unknown) => {
      initialization = null;
      throw error;
    });
  }
  await initialization;
}

export function readCollection<K extends CollectionName>(name: K): StoredCollections[K] {
  const key = collectionKeys[name];
  const serialized = window.localStorage.getItem(key);
  if (serialized === null) throw new Error(`Serenia storage is missing "${key}". Reinitialize the database and retry.`);
  try {
    return JSON.parse(serialized) as StoredCollections[K];
  } catch {
    throw new Error(`Serenia storage "${key}" is invalid. Reset the database from Settings and try again.`);
  }
}

export function updateCollections(updates: CollectionUpdate): void {
  writeCollections(updates);
}

export function readAllCollections(): StoredCollections {
  return {
    clusters: readCollection('clusters'),
    propertyTypes: readCollection('propertyTypes'),
    clusterHistory: readCollection('clusterHistory'),
    requests: readCollection('requests'),
    analytics: readCollection('analytics'),
    settings: readCollection('settings'),
    session: readCollection('session'),
    wizardAutosave: readCollection('wizardAutosave'),
  };
}
