import { X } from 'lucide-react';

type Props = {
  open: boolean;
  onStay: () => void;
  onLeave: () => void;
};

export default function UnsavedChangesDialog({ open, onStay, onLeave }: Props): React.JSX.Element | null {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center bg-[#24241f]/35 p-4 backdrop-blur-sm">
      <button type="button" aria-label="Stay in wizard" onClick={onStay} className="absolute inset-0" />
      <section role="alertdialog" aria-modal="true" aria-labelledby="unsaved-title" className="relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        <button type="button" onClick={onStay} aria-label="Close" className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-[#85847c] hover:bg-[#f4f3ef]">
          <X className="h-4 w-4" />
        </button>
        <h2 id="unsaved-title" className="text-sm font-semibold text-[#33332b]">Leave without saving?</h2>
        <p className="mt-2 text-xs leading-5 text-[#77766e]">Your cluster changes are not saved yet. Do you want to leave this wizard?</p>
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onStay} className="rounded-lg border border-[#e1e0d8] px-3 py-2 text-xs text-[#55554d]">Stay here</button>
          <button type="button" onClick={onLeave} className="rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-700">Leave</button>
        </div>
      </section>
    </div>
  );
}
