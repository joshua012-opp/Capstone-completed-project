import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';

type Props = {
  title: string;
  description: string;
  action?: ReactNode;
};

export default function DashboardPlaceholder({ title, description, action }: Props) {
  return (
    <section className="rounded-xl border border-[#ecebe4] bg-white p-5 shadow-[0_1px_2px_rgba(35,34,25,0.025)] sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-[#2d2d25]">{title}</h2>
          <p className="mt-1.5 max-w-2xl text-xs leading-5 text-[#77766e]">{description}</p>
        </div>
        {action}
      </div>
      <div className="mt-6 flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-[#deddd4] bg-[#fbfbf8] px-5 py-8 text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0efe5] text-[#85802f]">
          <ArrowUpRight className="h-5 w-5" />
        </div>
        <p className="mt-3 text-xs font-medium text-[#55554d]">This section is ready for dashboard data.</p>
        <p className="mt-1 max-w-md text-[10px] leading-4 text-[#929188]">
          Placeholder view only. Content can be connected when the data layer is ready.
        </p>
      </div>
    </section>
  );
}
