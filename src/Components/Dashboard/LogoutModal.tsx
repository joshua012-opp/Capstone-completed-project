import { DoorOpen, X } from 'lucide-react';

type Props = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  error?: string;
  busy?: boolean;
};

export default function LogoutModal({ open, onCancel, onConfirm, error = '', busy = false }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-80 flex items-center justify-center bg-[#29291f]/35 px-4 py-6 backdrop-blur-[5px]">
      <button type="button" aria-label="Close logout confirmation" onClick={onCancel} className="absolute inset-0 cursor-default" />
      <section role="dialog" aria-modal="true" aria-labelledby="logout-title" className="relative z-10 w-full max-w-95 rounded-2xl bg-white px-6 py-7 text-center shadow-2xl sm:px-9">
        <button type="button" aria-label="Close" onClick={onCancel} className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-[#85847c] hover:bg-[#f4f3ef]">
          <X className="h-4 w-4" />
        </button>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff0ed] text-[#d94b3f]">
          <DoorOpen className="h-9 w-9" strokeWidth={1.8} />
        </div>
        <h2 id="logout-title" className="mt-4 text-lg font-semibold text-[#24241e]">Sure want to log out?</h2>
        <p className="mt-2 text-sm leading-5 text-[#77766e]">Are you sure you want to log out of this account?</p>
        {error && <p role="alert" className="mt-3 rounded-lg bg-[#fff1ef] px-3 py-2 text-xs text-[#b63d34]">{error}</p>}
        <div className="mt-6 grid gap-2.5">
          <button type="button" disabled={busy} onClick={onConfirm} className="h-10 rounded-lg bg-[#d8483d] px-4 text-sm font-medium text-white transition-colors hover:bg-[#bd382f] disabled:cursor-wait disabled:opacity-60">
            {busy ? 'Logging out…' : 'Yes, log out'}
          </button>
          <button type="button" disabled={busy} onClick={onCancel} className="h-10 rounded-lg bg-[#f0f0ed] px-4 text-sm font-medium text-[#57574f] transition-colors hover:bg-[#e6e6e1] disabled:cursor-wait disabled:opacity-60">
            No, keep here
          </button>
        </div>
      </section>
    </div>
  );
}
