import PropertyTypeTabs from './PropertyTypeTabs';
import { useWizard } from './WizardContext';
import { emptyPropertyType } from './wizardData';
import Step4TypeAmenities from './steps/Step4TypeAmenities';
import Step4TypeDetails from './steps/Step4TypeDetails';
import Step4TypeFloorPlan from './steps/Step4TypeFloorPlan';
import Step4TypeGallery from './steps/Step4TypeGallery';
import Step4TypePricing from './steps/Step4TypePricing';

export default function Step4TypeForm(): React.JSX.Element {
  const { state } = useWizard();
  const draft = state.data.propertyDraft ?? emptyPropertyType();

  const activeTab = (() => {
    switch (state.currentSubstep) {
      case 'type-pricing': return <Step4TypePricing draft={draft} />;
      case 'type-gallery': return <Step4TypeGallery draft={draft} />;
      case 'type-floor-plan': return <Step4TypeFloorPlan draft={draft} />;
      case 'type-amenities': return <Step4TypeAmenities draft={draft} />;
      default: return <Step4TypeDetails draft={draft} />;
    }
  })();

  return (
    <div>
      <PropertyTypeTabs />
      {activeTab}
    </div>
  );
}
