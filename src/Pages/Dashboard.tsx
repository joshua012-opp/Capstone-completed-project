import { useState } from 'react';
import AvailableUnitsCard from '../Components/Dashboard/AvailableUnitsCard';
import CustomerInquiriesCard from '../Components/Dashboard/CustomerInquiriesCard';
import DashboardResource from '../Components/Dashboard/DashboardResource';
import DashboardSectionBoundary from '../Components/Dashboard/DashboardSectionBoundary';
import LatestRequestsCard from '../Components/Dashboard/LatestRequestsCard';
import StatCard from '../Components/Dashboard/StatCard';
import TourRequestBarChart from '../Components/Dashboard/TourRequestBarChart';
import TourRequestLineChart from '../Components/Dashboard/TourRequestLineChart';
import {
  useDashboardStats,
  useInquirySummary,
  useLatestRequests,
  useTourRequestsByCluster,
  useTourRequestsByMonth,
  useUnitsPerCluster,
} from '../hooks/useDashboardData';
import type { DashboardStat } from '../Components/Dashboard/dashboardTypes';

const CLUSTER_COLORS = ['#b5a74a', '#c4b35a', '#d3c171', '#dfd094', '#eee8c8'];

export default function DashboardPage(): React.JSX.Element {
  const [chartYear, setChartYear] = useState(2025);
  const stats = useDashboardStats();
  const monthlyRequests = useTourRequestsByMonth(chartYear);
  const unitsPerCluster = useUnitsPerCluster();
  const latestRequests = useLatestRequests(2);
  const requestsByCluster = useTourRequestsByCluster();
  const inquiries = useInquirySummary();

  const statCards: DashboardStat[] = stats.data
    ? [
      { title: 'Total properties', value: String(stats.data.totalProperties), trend: `${stats.data.trends?.properties ?? 0}%`, trendCaption: 'from last month' },
      { title: 'Available units', value: String(stats.data.availableUnits), trend: `${stats.data.trends?.availableUnits ?? 0}%`, trendCaption: 'from last month' },
      { title: 'Upcoming tours', value: String(stats.data.upcomingTours), trend: `${stats.data.trends?.upcomingTours ?? 0}%`, trendCaption: 'from last month' },
      { title: 'New request', value: String(stats.data.newRequests), trend: `${stats.data.trends?.newRequests ?? 0}%`, trendCaption: 'from last month' },
    ]
    : [];
  return (
    <div className="space-y-4">
      <DashboardSectionBoundary sectionName="Dashboard statistics">
        <DashboardResource resource={stats} sectionName="dashboard statistics" skeleton="stats">
          {() => (
            <section aria-label="Dashboard statistics" className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {statCards.map((stat) => <StatCard key={stat.title} stat={stat} />)}
              {statCards.length === 0 && <p className="text-xs text-[#77766e]">No dashboard statistics are available.</p>}
            </section>
          )}
        </DashboardResource>
      </DashboardSectionBoundary>

      <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.9fr)_minmax(300px,1fr)]">
        <DashboardSectionBoundary sectionName="Tour request chart">
          <DashboardResource resource={monthlyRequests} sectionName="tour request chart" skeleton="chart">
            {(data) => (
              <TourRequestLineChart
                data={data.map(({ month, requests }) => ({ month, requests }))}
                year={chartYear}
                onYearChange={setChartYear}
              />
            )}
          </DashboardResource>
        </DashboardSectionBoundary>
        <DashboardSectionBoundary sectionName="Available units">
          <DashboardResource resource={unitsPerCluster} sectionName="available units" skeleton="units">
            {(data) => (
              <AvailableUnitsCard
                totalUnits={data.reduce((total, cluster) => total + cluster.availableUnits, 0)}
                totalProperties={data.reduce((total, cluster) => total + cluster.totalUnits, 0)}
                clusters={data.map((cluster, index) => ({
                  name: cluster.name,
                  units: cluster.availableUnits,
                  percentage: cluster.percentage,
                  color: CLUSTER_COLORS[index % CLUSTER_COLORS.length],
                }))}
              />
            )}
          </DashboardResource>
        </DashboardSectionBoundary>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(340px,1.2fr)_minmax(250px,0.9fr)_minmax(260px,1fr)]">
        <DashboardSectionBoundary sectionName="Latest requests">
          <DashboardResource resource={latestRequests} sectionName="latest requests" skeleton="requests">
            {(data) => <LatestRequestsCard requests={data} />}
          </DashboardResource>
        </DashboardSectionBoundary>
        <DashboardSectionBoundary sectionName="Tour requests by cluster">
          <DashboardResource resource={requestsByCluster} sectionName="tour requests by cluster" skeleton="chart">
            {(data) => (
              <TourRequestBarChart
                data={data.map((cluster) => ({
                  cluster: cluster.cluster,
                  shortName: cluster.shortName,
                  requests: cluster.requests,
                }))}
              />
            )}
          </DashboardResource>
        </DashboardSectionBoundary>
        <DashboardSectionBoundary sectionName="Customer inquiries">
          <DashboardResource resource={inquiries} sectionName="customer inquiries" skeleton="summary">
            {(data) => (
              <CustomerInquiriesCard
                total={data.total}
                categories={[
                  { name: 'Answered', value: data.answered, color: '#a39c2a' },
                  { name: 'Pending', value: data.pending, color: '#d1b247' },
                  { name: 'Escalated', value: data.escalated, color: '#e8e5d9' },
                ]}
              />
            )}
          </DashboardResource>
        </DashboardSectionBoundary>
      </div>
    </div>
  );
}
