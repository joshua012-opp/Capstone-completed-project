import { MessageCircle, MoreHorizontal, Phone } from 'lucide-react';
import type { TourRequest } from './dashboardTypes';

type Props = {
  requests: TourRequest[];
};

export default function LatestRequestsCard({ requests }: Props) {
  return (
    <section className="min-w-0 rounded-xl border border-[#ecebe4] bg-white p-4 shadow-[0_1px_2px_rgba(35,34,25,0.025)] sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[#33332b]">Latest request</h2>
        <button type="button" aria-label="More request options" className="flex h-7 w-7 items-center justify-center rounded-md text-[#8d8c83] hover:bg-[#f5f4ef]">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-2.5">
        {requests.length === 0 && (
          <p className="rounded-lg border border-dashed border-[#deddd4] px-4 py-8 text-center text-[10px] text-[#85847b]">
            No recent tour requests.
          </p>
        )}
        {requests.map((request) => (
          <article key={`${request.name}-${request.unit}`} className="rounded-lg border border-[#eeede7] p-3">
            <div className="flex items-start gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eee8d2] text-[10px] font-semibold text-[#77741f]">
                {request.initials}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-semibold text-[#383830]">{request.name}</p>
                <p className="mt-0.5 truncate text-[9px] text-[#818078]">{request.cluster} · Unit {request.unit}</p>
              </div>
              <div className="flex shrink-0 gap-1">
                <a
                  href={`tel:${request.phone.replace(/[^\d+]/g, '')}`}
                  aria-label={`Call ${request.name}`}
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-[#ecebe5] text-[#77741f] hover:bg-[#f5f4eb]"
                >
                  <Phone className="h-3.5 w-3.5" />
                </a>
                <a
                  href={`mailto:${request.email}`}
                  aria-label={`Message ${request.name}`}
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-[#ecebe5] text-[#77741f] hover:bg-[#f5f4eb]"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
            <a href={`mailto:${request.email}`} className="mt-2 block truncate text-[9px] text-[#8a8980] hover:text-[#77741f]">{request.email}</a>
            <div className="mt-2.5 grid grid-cols-2 gap-2 border-t border-[#f0efe9] pt-2.5">
              <div className="min-w-0">
                <p className="text-[8px] uppercase tracking-wide text-[#aaa99f]">Tour date</p>
                <p className="mt-1 truncate text-[9px] font-medium text-[#55554d]">{request.date}</p>
              </div>
              <div className="min-w-0">
                <p className="text-[8px] uppercase tracking-wide text-[#aaa99f]">Tour time</p>
                <p className="mt-1 truncate text-[9px] font-medium text-[#55554d]">{request.time}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
