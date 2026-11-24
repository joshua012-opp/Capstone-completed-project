import { Ellipsis, TrendingUp } from 'lucide-react';
import type { DashboardStat } from './dashboardTypes';

type Props = {
  stat: DashboardStat;
};

export default function StatCard({ stat }: Props) {
  return (
    <article className="rounded-xl border border-[#ecebe4] bg-white p-4 shadow-[0_1px_2px_rgba(35,34,25,0.025)] sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-[11px] font-medium text-[#77766e] sm:text-xs">{stat.title}</h2>
        <button type="button" aria-label={`More options for ${stat.title}`} className="-mr-1 -mt-1 flex h-7 w-7 items-center justify-center rounded-md text-[#8d8c83] hover:bg-[#f5f4ef]">
          <Ellipsis className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-2">
        <p className="text-[26px] font-semibold leading-none tracking-tight text-[#24241e] sm:text-[30px]">{stat.value}</p>
        <span className="mb-0.5 inline-flex items-center gap-1 rounded-full bg-[#eef5ec] px-2 py-1 text-[9px] font-medium text-[#4d8558]">
          <TrendingUp className="h-3 w-3" />
          {stat.trend}
        </span>
      </div>
      <p className="mt-2 text-[9px] text-[#a09f96]">{stat.trendCaption}</p>
    </article>
  );
}
