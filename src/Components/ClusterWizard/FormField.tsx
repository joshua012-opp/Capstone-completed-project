import type { ReactNode } from 'react';

type Props = {
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
};

export default function FormField({ label, error, required, children }: Props): React.JSX.Element {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-[#45453d]">
        {label}{required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {children}
      {error && <p role="alert" className="text-[11px] text-red-600">{error}</p>}
    </div>
  );
}

export const inputClass =
  'h-10 w-full rounded-lg border border-[#e4e3dc] bg-white px-3 text-xs text-[#37372f] outline-none transition focus:border-[#898b5a] focus:ring-2 focus:ring-[#898b5a]/10';

export const textareaClass =
  'min-h-24 w-full rounded-lg border border-[#e4e3dc] bg-white px-3 py-2.5 text-xs text-[#37372f] outline-none transition focus:border-[#898b5a] focus:ring-2 focus:ring-[#898b5a]/10';
