import type { ClusterStatus } from '../types/serenia';
import { getClusters } from '../services/clusterService';
import { useAsyncData } from './useAsyncData';

export type PropertyFilters = {
  search?: string;
  sort?: 'latest' | 'oldest' | 'name' | 'price';
  status?: ClusterStatus;
};

export function useProperties(filters: PropertyFilters = {}) {
  const { search = '', sort = 'latest', status = '' } = filters;
  const dependencyKey = `${search.trim()}|${sort}|${status}`;
  return useAsyncData(
    () => getClusters({ search, sort, status: status || undefined }),
    ['clusters', 'types'],
    dependencyKey,
  );
}
