import { serviceDelay } from './delay';
import { initializeDatabase, readCollection, updateCollections } from './storage';
import type { NewTourRequest, RequestFilters, RequestStatus, TourRequest } from '../types/serenia';

function monthLabel(date: Date): string {
  return new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
}

function incrementMonth(months: Partial<Record<string, number>>, month: string): Partial<Record<string, number>> {
  const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const index = monthOrder.indexOf(month);
  const next: Partial<Record<string, number>> = { ...months };
  if (index >= 0) {
    monthOrder.slice(0, index).forEach((label) => {
      if (next[label] === undefined) next[label] = 0;
    });
  }
  next[month] = (next[month] ?? 0) + 1;
  return next;
}

export async function getRequests(filters: RequestFilters = {}): Promise<TourRequest[]> {
  await serviceDelay();
  await initializeDatabase();
  // Replace this localStorage read with the tour requests API fetch when the backend is available.
  const query = filters.search?.trim().toLowerCase();
  return readCollection('requests')
    .filter((request) => !filters.clusterId || request.clusterId === filters.clusterId)
    .filter((request) => !filters.status || request.status === filters.status)
    .filter((request) => !query || `${request.name} ${request.email} ${request.unit}`.toLowerCase().includes(query))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getLatestRequests(limit: number): Promise<TourRequest[]> {
  await serviceDelay();
  await initializeDatabase();
  // Replace this localStorage read with the latest requests API fetch when the backend is available.
  if (!Number.isInteger(limit) || limit < 0) throw new Error('Request limit must be a non-negative whole number.');
  return readCollection('requests')
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);
}

export async function addRequest(data: NewTourRequest): Promise<TourRequest> {
  await serviceDelay();
  await initializeDatabase();
  // Replace these localStorage reads and writes with the tour request create API when the backend is available.
  const cluster = readCollection('clusters').find((item) => item.id === data.clusterId);
  if (!cluster) throw new Error('Choose a valid cluster for this tour request.');
  if (cluster.status !== 'opened') throw new Error('Tour requests are only available for opened clusters.');

  const timestamp = new Date();
  const request: TourRequest = {
    ...data,
    status: data.status ?? 'new',
    id: crypto.randomUUID(),
    createdAt: timestamp.toISOString(),
  };
  const requests = readCollection('requests');
  const analytics = readCollection('analytics');
  const isNew = request.status === 'new';
  const nextAnalytics = {
    ...analytics,
    upcomingTours: analytics.upcomingTours + 1,
    newRequests: analytics.newRequests + (isNew ? 1 : 0),
    tourRequestsByMonth: incrementMonth(analytics.tourRequestsByMonth, monthLabel(timestamp)),
    tourRequestsByCluster: {
      ...analytics.tourRequestsByCluster,
      [request.clusterId]: (analytics.tourRequestsByCluster[request.clusterId] ?? 0) + 1,
    },
  };
  updateCollections({ requests: [...requests, request], analytics: nextAnalytics });
  return request;
}

export async function updateRequestStatus(id: string, status: RequestStatus): Promise<TourRequest> {
  await serviceDelay();
  await initializeDatabase();
  // Replace these localStorage reads and writes with the request status API when the backend is available.
  const requests = readCollection('requests');
  const request = requests.find((item) => item.id === id);
  if (!request) throw new Error('Tour request not found.');
  const updatedRequest = { ...request, status };
  const analytics = readCollection('analytics');
  let newRequests = analytics.newRequests;
  if (request.status === 'new' && status !== 'new') newRequests = Math.max(0, newRequests - 1);
  else if (request.status !== 'new' && status === 'new') newRequests += 1;
  updateCollections({
    requests: requests.map((item) => item.id === id ? updatedRequest : item),
    analytics: { ...analytics, newRequests },
  });
  return updatedRequest;
}

export async function addInquiry(_data: { name?: string; email?: string; clusterId?: string; message?: string } = {}): Promise<void> {
  await serviceDelay();
  await initializeDatabase();
  // Replace this localStorage aggregate update with the inquiry API when the backend is available.
  const analytics = readCollection('analytics');
  updateCollections({
    analytics: {
      ...analytics,
      inquiries: {
        ...analytics.inquiries,
        total: analytics.inquiries.total + 1,
        pending: analytics.inquiries.pending + 1,
      },
    },
  });
}
