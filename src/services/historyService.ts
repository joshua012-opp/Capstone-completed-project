import { serviceDelay } from './delay';
import { initializeDatabase, readCollection } from './storage';
import type { ClusterHistoryEntry } from '../types/serenia';

export async function getClusterHistory(clusterId: string): Promise<ClusterHistoryEntry[]> {
  await serviceDelay();
  await initializeDatabase();
  // Replace this localStorage read with the cluster history API fetch when the backend is available.
  return readCollection('clusterHistory')
    .filter((entry) => entry.clusterId === clusterId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
