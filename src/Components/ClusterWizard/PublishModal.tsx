import { X } from 'lucide-react';
import type { ClusterSubmitMode } from '../../types/clusterWizard';

type Props = {
  open: boolean;
  mode: 'create' | 'edit';
  clusterName: string;
  incompleteSteps: string[];
  onClose: () => void;
  onSubmit: (mode: ClusterSubmitMode) => void;
};

export default function PublishModal({ open, mode, clusterName, incompleteSteps, onClose, onSubmit }: Props): React.JSX.Element | null {
  if (!open) return null;
  const publishReady = incompleteSteps.length === 0;
  const draftReady = clusterName.trim().length > 0;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#24241f]/35 p-4 backdrop-blur-sm">
      <button type="button" aria-label="Close publish dialog" onClick={onClose} className="absolute inset-0" />
      <section role="dialog" aria-modal="true" aria-labelledby="publish-dialog-title" className="relative z-10 w-full max-w-[410px] rounded-2xl bg-white p-6 text-center shadow-2xl">
        <button type="button" aria-label="Close" onClick={onClose} className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-[#85847c] hover:bg-[#f4f3ef]">
          <X className="h-4 w-4" />
        </button>
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f0f0e9] text-3xl text-[#646747]" aria-hidden="true">⌂</div>
        <h2 id="publish-dialog-title" className="mt-4 text-base font-semibold text-[#33332b]">Want to publish now?</h2>
        <p className="mt-2 text-xs leading-5 text-[#77766e]">You can publish now if everything is filled in, or save it as a draft.</p>
        {!publishReady && (
          <div className="mt-4 rounded-lg bg-[#fff9e7] p-3 text-left">
            <p className="text-[10px] font-semibold text-[#6b5b2b]">Complete these steps before publishing:</p>
            <ul className="mt-1 list-inside list-disc text-[10px] text-[#776b43]">
              {incompleteSteps.map((step) => <li key={step}>{step}</li>)}
            </ul>
          </div>
        )}
        {!draftReady && <p className="mt-3 text-[10px] text-red-600">Add a cluster name before saving a draft.</p>}
        <div className="mt-6 grid gap-2">
          <button
            type="button"
            disabled={!publishReady}
            onClick={() => onSubmit('publish')}
            className="h-10 rounded-lg bg-[#56593B] px-4 text-xs font-medium text-white hover:bg-[#474a31] disabled:cursor-not-allowed disabled:bg-[#a8a991]"
          >
            Yes, Upload now
          </button>
          {mode === 'create' && (
            <button
              type="button"
              disabled={!draftReady}
              onClick={() => onSubmit('draft')}
              className="h-10 rounded-lg border border-[#dfded5] bg-white px-4 text-xs font-medium text-[#55554d] hover:bg-[#f7f6f1] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Save as draft
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
