import { ChevronDown } from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { LineChartPoint } from './dashboardTypes';

type Props = {
  data: LineChartPoint[];
  year: number;
  onYearChange: (year: number) => void;
};

type TooltipProps = {
  year: number;
  active?: boolean;
  payload?: Array<{ value?: number; payload?: LineChartPoint }>;
  label?: string | number;
};

function RequestTooltip({ active, payload, label, year }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const month = payload[0]?.payload?.month ?? label;

  return (
    <div className="rounded-lg bg-[#29291f] px-3 py-2 text-white shadow-lg">
      <p className="text-[10px] text-white/70">{month}, {year}</p>
      <p className="mt-1 text-xs font-medium">{payload[0]?.value} Tour request</p>
    </div>
  );
}

export default function TourRequestLineChart({ data, year, onYearChange }: Props) {
  return (
    <section className="min-w-0 rounded-xl border border-[#ecebe4] bg-white p-4 shadow-[0_1px_2px_rgba(35,34,25,0.025)] sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-[#33332b]">Tour request</h2>
        <label className="relative">
          <span className="sr-only">Chart period</span>
          <select
            value={year}
            onChange={(event) => onYearChange(Number(event.target.value))}
            className="h-8 appearance-none rounded-lg border border-[#ecebe5] bg-white py-1 pl-2.5 pr-7 text-[10px] text-[#6f6e65] outline-none focus:border-[#a29b45]"
          >
            <option value={2025}>This year</option>
            <option value={2024}>Last year</option>
          </select>
          <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-[#77766e]" />
        </label>
      </div>

      <div className="h-56.25 w-full sm:h-62.5">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: -20 }}>
            <defs>
              <linearGradient id="tourRequestFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#b0a544" stopOpacity={0.28} />
                <stop offset="95%" stopColor="#b0a544" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#eeede8" strokeDasharray="3 4" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#99988f', fontSize: 9 }} tickMargin={9} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#a09f96', fontSize: 9 }} tickCount={5} />
            <Tooltip content={<RequestTooltip year={year} />} cursor={{ stroke: '#c4bf93', strokeDasharray: '3 3' }} />
            <Area
              type="monotone"
              dataKey="requests"
              stroke="#aaa03b"
              strokeWidth={2}
              fill="url(#tourRequestFill)"
              activeDot={{ r: 4, fill: '#88821f', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
