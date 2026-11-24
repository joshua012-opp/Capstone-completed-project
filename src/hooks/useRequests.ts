import type { RequestFilters, RequestStatus, TourRequest } from '../types/serenia';
import { getClusters } from '../services/clusterService';
import { getRequests, updateRequestStatus } from '../services/requestService';
import { useAsyncData } from './useAsyncData';

export type RequestWithCluster = TourRequest & { clusterName: string };

export function useRequests(filters: RequestFilters = {}) {
  const { clusterId = '', search = '', status = '' } = filters;
  const dependencyKey = `${clusterId}|${search.trim()}|${status}`;
  const resource = useAsyncData(
    async () => {
      const [requests, clusters] = await Promise.all([
        getRequests({ clusterId: clusterId || undefined, search, status: status || undefined }),
        getClusters(),
      ]);
      const clusterNames = new Map(clusters.map((cluster) => [cluster.id, cluster.name]));
      return requests.map((request): RequestWithCluster => {
        const clusterName = clusterNames.get(request.clusterId);
        if (!clusterName) throw new Error(`The cluster for ${request.name}'s request could not be found.`);
        return { ...request, clusterName };
      });
    },
    ['clusters', 'requests'],
    dependencyKey,
  );

  return {
    ...resource,
    updateStatus: (id: string, nextStatus: RequestStatus) => updateRequestStatus(id, nextStatus),
  };
}
