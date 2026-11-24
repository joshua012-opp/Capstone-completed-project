import { serviceDelay } from './delay';
import { initializeDatabase, readCollection } from './storage';
import type { SearchCategory, SearchResults } from '../types/serenia';

export async function search(query: string, category: SearchCategory = 'all'): Promise<SearchResults> {
  await serviceDelay();
  await initializeDatabase();
  // Replace these localStorage reads with the cross-collection search API when the backend is available.
  const normalizedQuery = query.trim().toLowerCase();
  const clusters = readCollection('clusters').filter((cluster) => cluster.status !== 'draft');
  const clustersById = new Map(clusters.map((cluster) => [cluster.id, cluster]));
  const properties = category === 'all' || category === 'property'
    ? readCollection('propertyTypes')
      .flatMap((propertyType) => {
        const cluster = clustersById.get(propertyType.clusterId);
        if (!cluster) return [];
        const content = `${propertyType.name} ${propertyType.description} ${cluster.name}`.toLowerCase();
        return content.includes(normalizedQuery) ? [{ propertyType, cluster }] : [];
      })
    : [];
  const requests = category === 'all' || category === 'request'
    ? readCollection('requests').flatMap((request) => {
      const cluster = clustersById.get(request.clusterId);
      if (!cluster) return [];
      const content = `${request.name} ${cluster.name} ${request.email}`.toLowerCase();
      return content.includes(normalizedQuery) ? [{ request, cluster }] : [];
    })
    : [];
  return { properties, requests };
}
