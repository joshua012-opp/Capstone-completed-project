import { useState, type ChangeEventHandler, type ReactNode } from 'react';
import whiteLogo from '../../assets/white logo.png';

export const authButtonClass =
  'flex min-h-11 w-full items-center justify-center bg-[#56593B] px-5 text-sm font-medium text-white transition-colors hover:bg-[#474a31] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#56593B] disabled:cursor-not-allowed disabled:opacity-50';

export function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <div className={`flex items-center gap-1.5 text-xs font-medium ${light ? 'text-white' : 'text-[#24251d]'}`}>
      <span className={`flex h-5 w-5 items-center justify-center ${light ? '' : 'rounded bg-[#56593B] p-0.5'}`}>
        <img src={whiteLogo} alt="" className="h-full w-full object-contain" />
      </span>
      <span>Serenia</span>
    </div>
  );
}

export function AuthTextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
  required = true,
}: {
  id: string;
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  autoComplete: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-[#343434]">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type="email"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className="mt-1.5 h-10 w-full border border-[#dededb] bg-white px-3 text-xs text-[#222] outline-none transition focus:border-[#56593B] focus:ring-1 focus:ring-[#56593B]"
      />
    </div>
  );
}

export function AuthPasswordField({
  id,
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  autoComplete: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-[#343434]">
        {label}
      </label>
      <div className="mt-1.5 flex h-10 w-full items-center border border-[#dededb] bg-white pr-2 transition focus-within:border-[#56593B] focus-within:ring-1 focus-within:ring-[#56593B]">
        <input
          id={id}
          name={id}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          className="h-full min-w-0 flex-1 bg-transparent px-3 text-xs text-[#222] outline-none"
        />
        <button
          type="button"
          aria-label={visible ? 'Hide password' : 'Show password'}
          onClick={() => setVisible((current) => !current)}
          className="flex h-8 w-8 items-center justify-center text-[#74746e] hover:text-[#343434]"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 12s3.3-6 9.5-6 9.5 6 9.5 6-3.3 6-9.5 6-9.5-6-9.5-6Z" />
            <circle cx="12" cy="12" r="2.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export function SimpleAuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#f5f5f5] px-4 py-7 sm:px-6">
      <BrandMark />
      <div className="my-auto w-full max-w-105 py-10">{children}</div>
    </main>
  );
}

export type PreparedPostRequest<TBody> = {
  method: 'POST';
  url: string;
  body: TBody;
};

export function preparePostRequest<TBody>(url: string, body: TBody): PreparedPostRequest<TBody> {
  return { method: 'POST', url, body };
}
