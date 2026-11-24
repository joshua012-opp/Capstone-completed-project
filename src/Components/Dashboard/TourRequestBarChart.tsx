import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { ClusterTourPoint } from './dashboardTypes';

type Props = {
  data: ClusterTourPoint[];
};

type TooltipProps = {
  active?: boolean;
  payload?: Array<{ value?: number; payload?: ClusterTourPoint }>;
};

function ClusterTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const cluster = payload[0]?.payload?.cluster;

  return (
    <div className="rounded-lg bg-[#29291f] px-3 py-2 text-white shadow-lg">
      <p className="text-[10px] text-white/70">{cluster}</p>
      <p className="mt-1 text-xs font-medium">{payload[0]?.value} Tour request</p>
    </div>
  );
}

export default function TourRequestBarChart({ data }: Props) {
  return (
    <section className="min-w-0 rounded-xl border border-[#ecebe4] bg-white p-4 shadow-[0_1px_2px_rgba(35,34,25,0.025)] sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[#33332b]">Tour request</h2>
        <span className="text-[9px] text-[#a09f96]">By cluster</span>
      </div>
      <div className="h-55 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 2, bottom: 0, left: -22 }}>
            <CartesianGrid stroke="#eeede8" strokeDasharray="3 4" vertical={false} />
            <XAxis dataKey="shortName" axisLine={false} tickLine={false} tick={{ fill: '#99988f', fontSize: 8 }} tickMargin={8} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#a09f96', fontSize: 9 }} tickCount={5} />
            <Tooltip content={<ClusterTooltip />} cursor={{ fill: '#f7f6f0' }} />
            <Bar
              dataKey="requests"
              fill="#e8e5d8"
              activeBar={{ fill: '#928b25', stroke: '#928b25' }}
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
