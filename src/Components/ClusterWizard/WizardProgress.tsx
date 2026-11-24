import { Check } from 'lucide-react';
import type { WizardStepMeta } from '../../types/clusterWizard';
import { Building2, Images, SlidersHorizontal, House } from 'lucide-react';
import { REQUIRED_SUBSTEPS, validKey } from './wizardData';

type Props = {
  steps: WizardStepMeta[];
  currentStep: number;
  validSubsteps: Record<string, boolean>;
  canOpenStep: (step: number) => boolean;
  onStepClick: (step: number) => void;
  mode: 'create' | 'edit';
};

export default function WizardProgress({
  steps,
  currentStep,
  validSubsteps,
  canOpenStep,
  onStepClick,
  mode,
}: Props): React.JSX.Element {
  const currentMeta = steps.find((step) => step.step === currentStep) ?? steps[0];
  const stepIcons = [Building2, SlidersHorizontal, Images, House];

  return (
    <>
      <div className="hidden w-72.5 shrink-0 border-r border-[#eeede7] bg-white px-5 py-7 lg:block">
        <h2 className="mb-7 text-sm font-semibold text-[#33332b]">{mode === 'edit' ? 'Edit cluster' : 'Create new cluster'}</h2>
        <ol className="space-y-0">
          {steps.map((step, index) => {
            const required = REQUIRED_SUBSTEPS.filter((key) => key.startsWith(`${step.step}:`));
            const completed = step.step < currentStep || (required.length > 0 && required.every((key) => validSubsteps[key]));
            const current = step.step === currentStep;
            const clickable = canOpenStep(step.step);
            const Icon = stepIcons[index];
            return (
              <li key={step.step} className="relative flex gap-3 pb-7 last:pb-0">
                {index < steps.length - 1 && <span className="absolute left-3.75 top-8 h-[calc(100%-24px)] w-px bg-[#e8e7df]" />}
                <button
                  type="button"
                  disabled={!clickable}
                  onClick={() => onStepClick(step.step)}
                  aria-current={current ? 'step' : undefined}
                  className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs ${
                    completed ? 'border-[#7a7f51] bg-[#7a7f51] text-white' :
                    current ? 'border-[#697149] bg-white text-[#697149] ring-4 ring-[#697149]/10' :
                    'border-[#e2e1da] bg-white text-[#a3a298]'
                  } ${clickable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                >
                  {completed ? <Check className="h-4 w-4" /> : <Icon className="h-3.5 w-3.5" />}
                </button>
                <span className="min-w-0 pt-0.5">
                  <span className={`block text-xs font-medium ${current || completed ? 'text-[#36362e]' : 'text-[#9b9a91]'}`}>{step.step}. {step.title}</span>
                  <span className="mt-1 block text-[10px] leading-4 text-[#99988f]">{step.description}</span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="border-b border-[#eeede7] bg-white px-4 py-3 lg:hidden">
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="truncate text-[11px] font-semibold text-[#4c4b42]">{currentMeta.step}. {currentMeta.title}</p>
          <p className="shrink-0 text-[10px] text-[#94938a]">Step {currentStep} of 4</p>
        </div>
        <div className="flex gap-1">
          {steps.map((step) => (
            <span key={step.step} className={`h-1.5 flex-1 rounded-full ${step.step < currentStep ? 'bg-[#7a7f51]' : step.step === currentStep ? 'bg-[#7a7f51]' : 'bg-[#e9e8e1]'}`} />
          ))}
        </div>
      </div>
    </>
  );
}
