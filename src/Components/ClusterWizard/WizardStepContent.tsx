import Step1BasicInfo from './steps/Step1BasicInfo';
import Step1Location from './steps/Step1Location';
import Step2Amenities from './steps/Step2Amenities';
import Step2Specifications from './steps/Step2Specifications';
import Step3Brochure from './steps/Step3Brochure';
import Step3Cover from './steps/Step3Cover';
import Step3Gallery from './steps/Step3Gallery';
import Step4TypeForm from './Step4TypeForm';
import Step4TypesIntro from './steps/Step4TypesIntro';
import Step4TypesList from './steps/Step4TypesList';
import WizardStepBoundary from './WizardStepBoundary';

type Props = {
  step: number;
  substep: string;
};

export default function WizardStepContent({ step, substep }: Props): React.JSX.Element {
  let content: React.JSX.Element;
  let name = `Step ${step}`;
  if (step === 1 && substep === 'basic-information') {
    name = 'Basic information';
    content = <Step1BasicInfo />;
  } else if (step === 1 && substep === 'location') {
    name = 'Cluster location';
    content = <Step1Location />;
  } else if (step === 2 && substep === 'detail-specification') {
    name = 'Detail specification';
    content = <Step2Specifications />;
  } else if (step === 2 && substep === 'amenities') {
    name = 'Amenities and facilities';
    content = <Step2Amenities />;
  } else if (step === 3 && substep === 'cover') {
    name = 'Cluster cover';
    content = <Step3Cover />;
  } else if (step === 3 && substep === 'gallery') {
    name = 'Cluster gallery';
    content = <Step3Gallery />;
  } else if (step === 3 && substep === 'brochure') {
    name = 'Brochure and documents';
    content = <Step3Brochure />;
  } else if (step === 4 && substep === 'types') {
    name = 'Property types introduction';
    content = <Step4TypesIntro />;
  } else if (step === 4 && substep === 'types-list') {
    name = 'Property types list';
    content = <Step4TypesList />;
  } else if (step === 4 && substep.startsWith('type-')) {
    name = 'Property type details';
    content = <Step4TypeForm />;
  } else {
    content = <p className="text-sm text-[#77766e]">This wizard screen is unavailable.</p>;
  }

  return <WizardStepBoundary key={`${step}:${substep}`} stepName={name}>{content}</WizardStepBoundary>;
}
