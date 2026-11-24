import type { TourRequest as StoredTourRequest } from '../types/serenia';
import type { TourRequest as DashboardRequest } from '../Components/Dashboard/dashboardTypes';
import {
  getInquirySummary,
  getStats,
  getTourRequestsByCluster,
  getTourRequestsByMonth,
  getUnitsPerCluster,
} from '../services/dashboardService';
import { getClusters } from '../services/clusterService';
import { getLatestRequests } from '../services/requestService';
import { useAsyncData } from './useAsyncData';

const DASHBOARD_SCOPES = ['clusters', 'types', 'requests', 'analytics'] as const;

export function useDashboardStats() {
  return useAsyncData(getStats, DASHBOARD_SCOPES, 'stats');
}

export function useTourRequestsByMonth(year: number) {
  return useAsyncData(
    () => getTourRequestsByMonth(year),
    ['clusters', 'analytics'],
    year,
  );
}

export function useUnitsPerCluster() {
  return useAsyncData(getUnitsPerCluster, ['clusters', 'types'], 'units-per-cluster');
}

export function useLatestRequests(limit: number) {
  return useAsyncData(
    async () => {
      const [requests, clusters] = await Promise.all([getLatestRequests(limit), getClusters()]);
      const clusterNames = new Map(clusters.map((cluster) => [cluster.id, cluster.name]));
      return requests.map((request: StoredTourRequest): DashboardRequest => {
        const cluster = clusterNames.get(request.clusterId);
        if (!cluster) throw new Error(`The cluster for ${request.name}'s request could not be found.`);
        const date = new Date(`${request.tourDate}T00:00:00`);
        if (Number.isNaN(date.getTime())) throw new Error(`The tour date for ${request.name}'s request is invalid.`);
        return {
          name: request.name,
          initials: request.name.split(/\s+/).map((part) => part[0] ?? '').join('').slice(0, 2).toUpperCase(),
          cluster,
          unit: request.unit,
          email: request.email,
          phone: request.phone,
          date: new Intl.DateTimeFormat('en-US', {
            weekday: 'short',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }).format(date),
          time: request.tourTime,
        };
      });
    },
    ['clusters', 'requests'],
    limit,
  );
}

export function useTourRequestsByCluster() {
  return useAsyncData(getTourRequestsByCluster, ['clusters', 'analytics'], 'requests-by-cluster');
}

export function useInquirySummary() {
  return useAsyncData(getInquirySummary, ['clusters', 'analytics'], 'inquiries');
}
