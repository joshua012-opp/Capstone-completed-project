import type { WizardStepMeta } from '../../types/clusterWizard';
import { validKey } from './wizardData';

type Props = {
  step: WizardStepMeta;
  currentSubstep: string;
  validSubsteps: Record<string, boolean>;
};

export default function WizardSubstepProgress({ step, currentSubstep, validSubsteps }: Props): React.JSX.Element {
  const activeIndex = step.substeps.findIndex((substep) => substep.id === currentSubstep);
  return (
    <div className="mb-5">
      <div className="flex gap-1.5" aria-label="Sub-step progress">
        {step.substeps.map((substep, index) => (
          <span
            key={substep.id}
            title={substep.label}
            className={`h-1.5 flex-1 rounded-full ${
              index <= activeIndex || validSubsteps[validKey(step.step, substep.id)]
                ? 'bg-[#747c4c]' : 'bg-[#e8e7df]'
            }`}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between gap-2">
        {step.substeps.map((substep, index) => (
          <span key={substep.id} className={`text-[9px] sm:text-[10px] ${index === activeIndex ? 'font-medium text-[#555d36]' : 'text-[#a09f96]'}`}>
            {substep.label}
          </span>
        ))}
      </div>
    </div>
  );
}
