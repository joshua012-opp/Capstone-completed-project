import { deriveClusterSummary } from './clusterCalculations';
import { serviceDelay } from './delay';
import { initializeDatabase, readCollection } from './storage';
import type {
  ClusterUnitsSummary,
  DashboardStats,
  InquirySummary,
  TourRequestsByCluster,
  TourRequestsByMonth,
} from '../types/serenia';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export async function getStats(): Promise<DashboardStats> {
  await serviceDelay();
  await initializeDatabase();
  // Replace these localStorage reads with the dashboard statistics API fetch when the backend is available.
  const clusters = readCollection('clusters').filter((cluster) => cluster.status !== 'draft');
  const types = readCollection('propertyTypes');
  const analytics = readCollection('analytics');
  if (clusters.length === 0) {
    return { totalProperties: 0, availableUnits: 0, upcomingTours: 0, newRequests: 0, trends: null };
  }
  const summaries = clusters.map((cluster) => deriveClusterSummary(cluster, types));
  return {
    totalProperties: summaries.reduce((sum, summary) => sum + summary.totalUnits, 0),
    availableUnits: summaries.reduce((sum, summary) => sum + summary.unitStats.available, 0),
    upcomingTours: analytics.upcomingTours,
    newRequests: analytics.newRequests,
    trends: analytics.trends,
  };
}

export async function getTourRequestsByMonth(year: number): Promise<TourRequestsByMonth[]> {
  await serviceDelay();
  await initializeDatabase();
  // Replace this localStorage read with the tour analytics API fetch when the backend is available.
  const clusters = readCollection('clusters').filter((cluster) => cluster.status !== 'draft');
  if (clusters.length === 0) return [];
  const counts = readCollection('analytics').tourRequestsByMonth;
  return MONTHS
    .filter((month) => counts[month] !== undefined)
    .map((month) => ({ month, year, requests: counts[month] ?? 0 }));
}

export async function getUnitsPerCluster(): Promise<ClusterUnitsSummary[]> {
  await serviceDelay();
  await initializeDatabase();
  // Replace these localStorage reads with the cluster availability API fetch when the backend is available.
  const clusters = readCollection('clusters').filter((cluster) => cluster.status !== 'draft');
  const types = readCollection('propertyTypes');
  const values = clusters.map((cluster) => ({
    cluster,
    stats: deriveClusterSummary(cluster, types).unitStats,
  }));
  const totalAvailable = values.reduce((sum, value) => sum + value.stats.available, 0);

  return values.map(({ cluster, stats }) => ({
    clusterId: cluster.id,
    name: cluster.name,
    totalUnits: stats.total,
    availableUnits: stats.available,
    percentage: totalAvailable > 0 ? (stats.available / totalAvailable) * 100 : 0,
  }));
}

export async function getTourRequestsByCluster(): Promise<TourRequestsByCluster[]> {
  await serviceDelay();
  await initializeDatabase();
  // Replace these localStorage reads with the tour analytics API fetch when the backend is available.
  const clusters = readCollection('clusters').filter((cluster) => cluster.status !== 'draft');
  const counts = readCollection('analytics').tourRequestsByCluster;
  return clusters.map((cluster) => ({
    clusterId: cluster.id,
    cluster: cluster.name,
    shortName: cluster.name.split(' ')[0],
    requests: counts[cluster.id] ?? 0,
  }));
}

export async function getInquirySummary(): Promise<InquirySummary> {
  await serviceDelay();
  await initializeDatabase();
  // Replace this localStorage read with the inquiries API fetch when the backend is available.
  if (!readCollection('clusters').some((cluster) => cluster.status !== 'draft')) {
    return { total: 0, answered: 0, pending: 0, escalated: 0 };
  }
  return readCollection('analytics').inquiries;
}

export { MONTHS as DASHBOARD_MONTHS };
