import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import type { ClusterSubmitMode, WizardMode } from '../../types/clusterWizard';
import { useWizard } from './WizardContext';
import {
  incompleteRequiredLabels,
  isPublishReady,
  WIZARD_STEPS,
} from './wizardData';
import WizardProgress from './WizardProgress';
import WizardSubstepProgress from './WizardSubstepProgress';
import PublishModal from './PublishModal';

type Props = {
  mode: WizardMode;
  step: number;
  substep: string;
  canOpenStep: (step: number) => boolean;
  onBack: () => void;
  onStepClick: (step: number) => void;
  onAddPropertyType: () => void;
  onOpenPublish: () => void;
  onSubmit: (mode: ClusterSubmitMode) => void;
  children: ReactNode;
};

const descriptions: Record<string, string> = {
  'basic-information': 'Provide a name, tagline, and description for your cluster, so customers will know.',
  location: 'Add the location information customers will use to find this cluster.',
  'detail-specification': 'Complete the specifications for this cluster, from the cluster type to its amenities.',
  amenities: 'Add amenities and facilities that make this community special.',
  cover: 'Choose a cover image to introduce the cluster.',
  gallery: 'Add preview and gallery photos for this cluster.',
  brochure: 'Add a brochure or any supporting cluster documents.',
  types: 'Add property types for this cluster, along with the number of each unit.',
  'type-details': 'Add the property type details and unit configuration.',
  'type-pricing': 'Set the price, payment options, fees, and special offers.',
  'type-gallery': 'Add a cover and gallery photos for this property type.',
  'type-floor-plan': 'Add floor plans and annotate rooms with useful details.',
  'type-amenities': 'Choose the amenities included with this property type.',
  'types-list': 'Review the property types added to this cluster.',
};

type FooterProps = {
  mode: WizardMode;
  step: number;
  substep: string;
  onBack: () => void;
  onAddPropertyType: () => void;
  onOpenPublish: () => void;
  onSubmit: (mode: ClusterSubmitMode) => void;
};

function WizardFooter({ mode, step, substep, onBack, onAddPropertyType, onOpenPublish, onSubmit }: FooterProps): React.JSX.Element {
  const firstScreen = step === 1 && substep === 'basic-information';
  const typeIntro = step === 4 && substep === 'types';
  const typeList = step === 4 && substep === 'types-list';
  const editMode = mode === 'edit';

  return (
    <footer className="sticky bottom-0 z-10 mt-6 flex items-center justify-between gap-3 border-t border-[#eeede7] bg-white px-4 py-4 sm:px-7">
      {!firstScreen ? (
        <button type="button" onClick={onBack} className="rounded-lg border border-[#e4e3dc] bg-[#f5f4ef] px-4 py-2.5 text-xs font-medium text-[#55554d] hover:bg-[#eae9e2]">
          Back
        </button>
      ) : <span />}

      {typeIntro ? (
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => editMode ? onSubmit('edit') : onOpenPublish()} className="rounded-lg px-3 py-2.5 text-xs font-medium text-[#77766e] hover:bg-[#f5f4ef]">
            Skip for now
          </button>
          <button type="button" onClick={onAddPropertyType} className="rounded-lg bg-[#56593B] px-5 py-2.5 text-xs font-medium text-white hover:bg-[#474a31]">
            Continue
          </button>
        </div>
      ) : typeList ? (
        <button type="button" onClick={() => editMode ? onSubmit('edit') : onOpenPublish()} className="rounded-lg bg-[#56593B] px-5 py-2.5 text-xs font-medium text-white hover:bg-[#474a31]">
          {editMode ? 'Save changes' : 'Finish'}
        </button>
      ) : (
        <button type="submit" form="wizard-step-form" className="rounded-lg bg-[#56593B] px-5 py-2.5 text-xs font-medium text-white hover:bg-[#474a31]">
          {step === 4 && substep === 'type-amenities' ? 'Finish' : 'Continue'}
        </button>
      )}
    </footer>
  );
}

export default function ClusterWizardLayout({
  mode,
  step,
  substep,
  canOpenStep,
  onBack,
  onStepClick,
  onAddPropertyType,
  onOpenPublish,
  onSubmit,
  children,
}: Props): React.JSX.Element {
  const { state, dispatch } = useWizard();
  const meta = WIZARD_STEPS.find((item) => item.step === step) ?? WIZARD_STEPS[0];
  const substepMeta = meta.substeps.find((item) => item.id === substep);
  const title = substepMeta?.label ?? 'Properties types';
  const requiredValid = isPublishReady(state);
  const incompleteSteps = incompleteRequiredLabels(state);
  const clusterName = state.data.details.name;

  return (
    <div className="space-y-4 pb-2">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] text-[#8b8a81]">
        <Link to="/properties" className="hover:text-[#56593B]">All clusters</Link>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-[#4d4d44]">{mode === 'edit' ? 'Edit cluster' : 'Add new cluster'}</span>
      </nav>

      <div className="overflow-hidden rounded-2xl border border-[#e8e7df] bg-white shadow-[0_1px_3px_rgba(35,34,25,0.04)]">
        <div className="flex min-h-[calc(100vh-180px)] flex-col lg:flex-row">
          <WizardProgress
            steps={WIZARD_STEPS}
            currentStep={step}
            validSubsteps={state.validSubsteps}
            canOpenStep={canOpenStep}
            onStepClick={onStepClick}
            mode={mode}
          />
          <section className="flex min-w-0 flex-1 flex-col bg-[#fafaf8]">
            <div className="border-b border-[#eeede7] bg-white px-4 pb-5 pt-6 sm:px-7">
              <div className="mx-auto max-w-190">
                <h1 className="text-center text-base font-semibold text-[#33332b] sm:text-lg">{title}</h1>
                <p className="mx-auto mt-1.5 max-w-xl text-center text-[10px] leading-5 text-[#85847b] sm:text-xs">
                  {descriptions[substep] ?? 'Add detailed information for your cluster.'}
                </p>
                <div className="mt-5">
                  <WizardSubstepProgress step={meta} currentSubstep={substep} validSubsteps={state.validSubsteps} />
                </div>
              </div>
            </div>
            <div className="flex-1 px-4 py-5 sm:px-7 sm:py-6">
              <div className="mx-auto w-full max-w-190 rounded-xl border border-[#eeede7] bg-white p-4 sm:p-6">
                {children}
              </div>
            </div>
            <WizardFooter
              mode={mode}
              step={step}
              substep={substep}
              onBack={onBack}
              onAddPropertyType={onAddPropertyType}
              onOpenPublish={onOpenPublish}
              onSubmit={onSubmit}
            />
          </section>
        </div>
      </div>
      <PublishModal
        open={state.publishDialogOpen}
        mode={mode}
        clusterName={clusterName}
        incompleteSteps={incompleteSteps}
        onClose={() => dispatch({ type: 'SET_PUBLISH_DIALOG', open: false })}
        onSubmit={onSubmit}
      />
      {!requiredValid && state.publishDialogOpen && <span className="sr-only">The cluster is not ready to publish.</span>}
    </div>
  );
}
