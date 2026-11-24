import { useWizard } from './WizardContext';
import { validKey } from './wizardData';
import { useWizardNavigation } from './wizardNavigation';

const tabs = [
  { id: 'type-details', label: 'Details' },
  { id: 'type-pricing', label: 'Pricing' },
  { id: 'type-gallery', label: 'Gallery' },
  { id: 'type-floor-plan', label: 'Floor plan' },
  { id: 'type-amenities', label: 'Amenities' },
];

export default function PropertyTypeTabs(): React.JSX.Element {
  const { state } = useWizard();
  const { goTo } = useWizardNavigation();
  const currentIndex = tabs.findIndex((tab) => tab.id === state.currentSubstep);

  const isAccessible = (target: number) => {
    if (target <= currentIndex) return true;
    return tabs.slice(0, target).every((tab) => state.validSubsteps[validKey(4, tab.id)]);
  };

  return (
    <div className="mb-5 flex gap-1 overflow-x-auto rounded-lg bg-[#f5f4ef] p-1">
      {tabs.map((tab, index) => {
        const active = tab.id === state.currentSubstep;
        const completed = Boolean(state.validSubsteps[validKey(4, tab.id)]);
        return (
          <button
            type="button"
            key={tab.id}
            disabled={!isAccessible(index)}
            onClick={() => goTo(4, tab.id)}
            className={`shrink-0 rounded-md px-3 py-2 text-[10px] ${
              active ? 'bg-white font-medium text-[#555d36] shadow-sm' :
              completed ? 'text-[#697149]' : 'text-[#8e8d84]'
            } disabled:cursor-not-allowed disabled:opacity-50`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
