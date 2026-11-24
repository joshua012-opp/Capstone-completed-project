import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import UploadField from '../UploadField';
import { useWizard } from '../WizardContext';
import { useWizardNavigation } from '../wizardNavigation';

const schema = z.object({ brochure: z.boolean() });
type Values = z.infer<typeof schema>;

export default function Step3Brochure(): React.JSX.Element {
  const { state, dispatch } = useWizard();
  const { goTo } = useWizardNavigation();
  const { handleSubmit } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { brochure: true },
  });

  const onSubmit = () => {
    dispatch({ type: 'SET_VALID', key: '3:brochure', valid: true });
    goTo(4, 'types');
  };

  return (
    <form id="wizard-step-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-[#3d3d35]">The brochure & document</h3>
        <p className="mt-1 text-[11px] leading-5 text-[#85847b]">Upload marketing brochure or any other cluster additional document.</p>
      </div>
      <UploadField
        label="Brochure & document"
        value={state.data.brochures}
        onChange={(assets) => {
          dispatch({ type: 'SET_DATA', data: { brochures: assets } });
        }}
        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
        imageOnly={false}
        hint="PDF, Word, Excel or PowerPoint · max size 20MB"
        multiple
      />
      <p className="text-[10px] text-[#99988f]">This step is optional. Continue when you’re ready.</p>
    </form>
  );
}
