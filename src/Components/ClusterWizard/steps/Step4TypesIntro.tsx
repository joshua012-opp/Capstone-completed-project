import { House } from 'lucide-react';
import { useWizard } from '../WizardContext';
import { emptyPropertyType } from '../wizardData';
import { useWizardNavigation } from '../wizardNavigation';

export default function Step4TypesIntro(): React.JSX.Element {
  const { dispatch } = useWizard();
  const { goTo } = useWizardNavigation();
  const addFirstType = () => {
    dispatch({ type: 'SET_PROPERTY_DRAFT', propertyDraft: emptyPropertyType() });
    goTo(4, 'type-details');
  };

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center py-8 text-center">
      <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-[#f0f0e9] text-[#646747]" aria-hidden="true">
        <House className="h-12 w-12" strokeWidth={1.3} />
      </div>
      <h3 className="text-base font-semibold text-[#36362e]">Properties types</h3>
      <p className="mt-2 max-w-sm text-xs leading-5 text-[#85847b]">Add detailed information, including the price of this type of house and its units.</p>
      <button type="button" onClick={addFirstType} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#56593B] px-4 py-2.5 text-xs font-medium text-white hover:bg-[#474a31]">
        <span className="text-lg leading-none">+</span> Add types
      </button>
      <div className="mt-7 w-full rounded-xl border border-[#f1d98c] bg-[#fff9e7] p-3.5 text-left text-[10px] leading-5 text-[#6b5b2b]">
        <strong>Just to note</strong><br />
        Property types can also be added later, after the cluster is created.
      </div>
    </div>
  );
}
