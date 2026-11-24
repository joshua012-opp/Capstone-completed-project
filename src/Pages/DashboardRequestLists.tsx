import { useState } from 'react';
import { Search } from 'lucide-react';
import DashboardResource from '../Components/Dashboard/DashboardResource';
import { useRequests } from '../hooks/useRequests';
import type { RequestStatus } from '../types/serenia';

const STATUSES: { value: 'all' | RequestStatus; label: string }[] = [
  { value: 'all', label: 'All requests' },
  { value: 'new', label: 'New' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'done', label: 'Done' },
  { value: 'cancelled', label: 'Cancelled' },
];

const STATUS_STYLE: Record<RequestStatus, string> = {
  new: 'bg-[#f7f1df] text-[#947b26]',
  confirmed: 'bg-[#eef5ec] text-[#4d8558]',
  done: 'bg-[#f1f0ec] text-[#77766e]',
  cancelled: 'bg-[#f8ecea] text-[#a85045]',
};

function formatDate(value: string): string {
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}

export default function DashboardRequestListsPage(): React.JSX.Element {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | RequestStatus>('all');
  const [updatingId, setUpdatingId] = useState('');
  const [actionError, setActionError] = useState('');
  const requests = useRequests({ search: query, status: status === 'all' ? undefined : status });

  const changeStatus = async (id: string, nextStatus: RequestStatus) => {
    setUpdatingId(id);
    setActionError('');
    try {
      await requests.updateStatus(id, nextStatus);
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Unable to update this request.');
    } finally {
      setUpdatingId('');
    }
  };

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-[#ecebe4] bg-white p-5 shadow-[0_1px_2px_rgba(35,34,25,0.025)] sm:p-6">
        <div>
          <h2 className="text-base font-semibold text-[#2d2d25]">Tour requests</h2>
          <p className="mt-1.5 text-xs leading-5 text-[#77766e]">Review inquiries and update their follow-up status.</p>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_190px]">
          <label className="flex h-10 items-center gap-2 rounded-lg border border-[#ecebe6] px-3 text-[#8b8b82]">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search requests</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, email, or unit" className="min-w-0 flex-1 bg-transparent text-xs text-[#33332b] outline-none placeholder:text-[#99988f]" />
          </label>
          <label className="flex h-10 items-center rounded-lg border border-[#ecebe6] px-3">
            <span className="sr-only">Filter requests by status</span>
            <select value={status} onChange={(event) => setStatus(event.target.value as 'all' | RequestStatus)} className="w-full bg-transparent text-xs text-[#55554d] outline-none">
              {STATUSES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
          </label>
        </div>
        {actionError && <p role="alert" className="mt-3 rounded-lg bg-[#fff1ef] px-3 py-2 text-xs text-[#b63d34]">{actionError}</p>}
      </section>

      <DashboardResource resource={requests} sectionName="tour requests" skeleton="requests">
        {(rows) => rows.length === 0
          ? <div className="rounded-xl border border-dashed border-[#deddd4] bg-white px-5 py-12 text-center text-xs text-[#77766e]">No requests match these filters.</div>
          : (
            <div className="overflow-hidden rounded-xl border border-[#ecebe4] bg-white shadow-[0_1px_2px_rgba(35,34,25,0.025)]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-190 border-collapse text-left">
                  <thead className="bg-[#fbfbf8] text-[10px] uppercase tracking-wide text-[#929188]">
                    <tr>
                      <th className="px-4 py-3 font-medium">Customer</th>
                      <th className="px-4 py-3 font-medium">Cluster / unit</th>
                      <th className="px-4 py-3 font-medium">Tour date</th>
                      <th className="px-4 py-3 font-medium">Contact</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0efe9]">
                    {rows.map((request) => (
                      <tr key={request.id} className="text-xs text-[#55554d]">
                        <td className="px-4 py-3">
                          <p className="font-medium text-[#33332b]">{request.name}</p>
                          <p className="mt-1 text-[10px] text-[#929188]">{request.email}</p>
                        </td>
                        <td className="px-4 py-3">{request.clusterName} · {request.unit}</td>
                        <td className="px-4 py-3">
                          <p>{formatDate(request.tourDate)}</p>
                          <p className="mt-1 text-[10px] text-[#929188]">{request.tourTime}</p>
                        </td>
                        <td className="px-4 py-3"><a href={`tel:${request.phone}`} className="hover:text-[#77741f]">{request.phone}</a></td>
                        <td className="px-4 py-3">
                          <label className={`inline-flex rounded-full px-2 py-1 text-[10px] font-medium capitalize ${STATUS_STYLE[request.status]}`}>
                            <span className="sr-only">Status for {request.name}</span>
                            <select
                              aria-label={`Status for ${request.name}`}
                              value={request.status}
                              disabled={updatingId === request.id}
                              onChange={(event) => { void changeStatus(request.id, event.target.value as RequestStatus); }}
                              className="cursor-pointer appearance-none bg-transparent outline-none disabled:cursor-wait"
                            >
                              {STATUSES.filter((item) => item.value !== 'all').map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                            </select>
                          </label>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
      </DashboardResource>
    </div>
  );
}
