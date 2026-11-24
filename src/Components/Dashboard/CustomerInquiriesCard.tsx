import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { InquiryCategory } from './dashboardTypes';

type Props = {
  total: number;
  categories: InquiryCategory[];
};

export default function CustomerInquiriesCard({ total, categories }: Props) {
  return (
    <section className="min-w-0 rounded-xl border border-[#ecebe4] bg-white p-4 shadow-[0_1px_2px_rgba(35,34,25,0.025)] sm:p-5">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[#33332b]">Customer inquiries</h2>
      </div>
      <div className="relative mx-auto h-47.5 max-w-65">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={categories} dataKey="value" nameKey="name" innerRadius={56} outerRadius={78} paddingAngle={3} stroke="white" strokeWidth={2}>
              {categories.map((category) => <Cell key={category.name} fill={category.color} />)}
            </Pie>
            <Tooltip formatter={(value) => [`${value} inquiries`]} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-[9px] text-[#929188]">Total of</p>
          <p className="mt-0.5 text-lg font-semibold leading-none text-[#33332b]">{total}</p>
          <p className="mt-1 text-[9px] text-[#929188]">inquiries</p>
        </div>
      </div>

      <ul className="mt-3 space-y-2 border-t border-[#f0efe9] pt-3">
        {categories.map((category) => (
          <li key={category.name} className="flex items-center gap-2 text-[10px]">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: category.color }} />
            <span className="flex-1 text-[#77766e]">{category.name}</span>
            <span className="font-medium text-[#4b4b43]">{category.value}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
