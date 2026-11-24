import { Ellipsis } from 'lucide-react';
import type { ClusterUnits } from './dashboardTypes';

type Props = {
  totalUnits: number;
  totalProperties: number;
  clusters: ClusterUnits[];
};

export default function AvailableUnitsCard({ totalUnits, totalProperties, clusters }: Props) {
  return (
    <section className="min-w-0 rounded-xl border border-[#ecebe4] bg-white p-4 shadow-[0_1px_2px_rgba(35,34,25,0.025)] sm:p-5">
      <div className="flex items-start justify-between">
        <h2 className="text-sm font-semibold text-[#33332b]">Available units per cluster</h2>
        <button type="button" aria-label="More available units options" className="-mr-1 -mt-1 flex h-7 w-7 items-center justify-center rounded-md text-[#8d8c83] hover:bg-[#f5f4ef]">
          <Ellipsis className="h-4 w-4" />
        </button>
      </div>

      <p className="mt-4 text-[24px] font-semibold leading-none tracking-tight text-[#24241e]">
        {totalUnits}<span className="ml-1 text-sm font-normal text-[#aaa99f]">/{totalProperties}</span>
      </p>
      <p className="mt-1.5 text-[10px] text-[#99988f]">Total units of all clusters</p>

      <div className="mt-4 flex h-2.5 w-full overflow-hidden rounded-full bg-[#f0efe9]" aria-label="Available units distribution">
        {clusters.map((cluster) => (
          <span
            key={cluster.name}
            title={`${cluster.name}: ${cluster.units} units`}
            className="h-full"
            style={{ width: `${cluster.percentage}%`, backgroundColor: cluster.color }}
          />
        ))}
      </div>

      <ul className="mt-4 space-y-3">
        {clusters.map((cluster) => (
          <li key={cluster.name} className="flex items-center gap-2 text-[10px]">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: cluster.color }} />
            <span className="min-w-0 flex-1 truncate text-[#5e5e56]">{cluster.name}</span>
            <span className="w-7 text-right font-medium text-[#42423a]">{cluster.units}</span>
            <span className="w-10 text-right text-[#98978e]">{cluster.percentage.toFixed(1)}%</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
