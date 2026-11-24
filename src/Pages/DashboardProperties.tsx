import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Building2, Plus, Search } from 'lucide-react';
import DashboardResource from '../Components/Dashboard/DashboardResource';
import StoredImage from '../Components/StoredImage';
import { useProperties } from '../hooks/useProperties';
import type { ClusterStatus } from '../types/serenia';

const STATUS_OPTIONS: { value: 'all' | ClusterStatus; label: string }[] = [
  { value: 'all', label: 'All statuses' },
  { value: 'opened', label: 'Opened' },
  { value: 'planned', label: 'Planned' },
  { value: 'draft', label: 'Draft' },
  { value: 'closed', label: 'Closed' },
];

const STATUS_STYLES: Record<ClusterStatus, string> = {
  opened: 'bg-[#eef5ec] text-[#4d8558]',
  planned: 'bg-[#f7f1df] text-[#947b26]',
  draft: 'bg-[#f1f0ec] text-[#77766e]',
  closed: 'bg-[#f8ecea] text-[#a85045]',
};

function priceLabel(value: number | null): string {
  return value === null
    ? 'Price not set'
    : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}

export default function DashboardPropertiesPage(): React.JSX.Element {
  const { cluster: routeCluster } = useParams();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | ClusterStatus>('all');
  const selectedCluster = routeCluster ?? searchParams.get('cluster') ?? '';
  const properties = useProperties({
    search: query,
    sort: 'name',
    status: status === 'all' ? undefined : status,
  });
  const clusters = (properties.data ?? []).filter((item) => !selectedCluster || item.id === selectedCluster);

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-[#ecebe4] bg-white p-5 shadow-[0_1px_2px_rgba(35,34,25,0.025)] sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-[#2d2d25]">Properties & clusters</h2>
            <p className="mt-1.5 max-w-2xl text-xs leading-5 text-[#77766e]">
              Browse cluster inventory, availability, and property types stored in this browser.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/properties/new/1/basic-information" className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#56593B] px-3 text-xs font-medium text-white hover:bg-[#474a31]">
              <Building2 className="h-3.5 w-3.5" />
              Add new cluster
            </Link>
            <Link to="/dashboard/properties/add" className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#e2e1da] bg-white px-3 text-xs font-medium text-[#55554d] hover:bg-[#f7f6f1]">
              <Plus className="h-3.5 w-3.5" />
              Add property type
            </Link>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_190px]">
          <label className="flex h-10 items-center gap-2 rounded-lg border border-[#ecebe6] px-3 text-[#8b8b82]">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search clusters</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search cluster name or code"
              className="min-w-0 flex-1 bg-transparent text-xs text-[#33332b] outline-none placeholder:text-[#99988f]"
            />
          </label>
          <label className="flex h-10 items-center rounded-lg border border-[#ecebe6] px-3">
            <span className="sr-only">Filter by cluster status</span>
            <select value={status} onChange={(event) => setStatus(event.target.value as 'all' | ClusterStatus)} className="w-full bg-transparent text-xs text-[#55554d] outline-none">
              {STATUS_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </label>
        </div>
      </section>

      <DashboardResource resource={properties} sectionName="properties" skeleton="units">
        {(data) => {
          if (clusters.length === 0) {
            return (
              <div className="rounded-xl border border-dashed border-[#deddd4] bg-white px-5 py-12 text-center text-xs text-[#77766e]">
                {data.length === 0 ? 'No clusters match this search and status.' : 'The selected cluster could not be found.'}
              </div>
            );
          }
          return (
            <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
              {clusters.map((cluster) => (
                <article key={cluster.id} className="overflow-hidden rounded-xl border border-[#ecebe4] bg-white shadow-[0_1px_2px_rgba(35,34,25,0.025)]">
                  <StoredImage media={cluster.media.cover} alt={cluster.name} className="h-44 w-full" />
                  <div className="space-y-4 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#33332b]">{cluster.name}</p>
                        <p className="mt-1 text-[10px] text-[#929188]">{cluster.code} · {cluster.location.city}, {cluster.location.country}</p>
                      </div>
                      <span className={`shrink-0 rounded-full px-2 py-1 text-[9px] font-medium capitalize ${STATUS_STYLES[cluster.status]}`}>
                        {cluster.status}
                      </span>
                    </div>
                    <p className="line-clamp-2 min-h-8 text-[11px] leading-4 text-[#77766e]">{cluster.tagline}</p>
                    <div className="grid grid-cols-3 gap-2 border-y border-[#f0efe9] py-3 text-center">
                      <div>
                        <p className="text-sm font-semibold text-[#33332b]">{cluster.summary.totalTypes}</p>
                        <p className="mt-1 text-[9px] text-[#929188]">Types</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#33332b]">{cluster.summary.totalUnits}</p>
                        <p className="mt-1 text-[9px] text-[#929188]">Total units</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#33332b]">{cluster.summary.unitStats.available}</p>
                        <p className="mt-1 text-[9px] text-[#929188]">Available</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[9px] text-[#929188]">Starting from</p>
                        <p className="mt-0.5 text-xs font-semibold text-[#56593B]">{priceLabel(cluster.summary.priceFrom)}</p>
                      </div>
                      <div className="flex gap-2">
                        <Link to={`/dashboard/properties/${cluster.id}`} className="rounded-lg border border-[#e2e1da] px-3 py-2 text-[10px] font-medium text-[#55554d] hover:bg-[#f7f6f1]">
                          View
                        </Link>
                        <Link to={`/dashboard/properties/add?cluster=${cluster.id}`} className="rounded-lg bg-[#56593B] px-3 py-2 text-[10px] font-medium text-white hover:bg-[#474a31]">
                          Add type
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          );
        }}
      </DashboardResource>
    </div>
  );
}
