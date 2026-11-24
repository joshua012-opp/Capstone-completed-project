import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import UploadField from '../UploadField';
import { useWizard } from '../WizardContext';
import { useWizardNavigation } from '../wizardNavigation';
import type { WizardAsset } from '../../../types/clusterWizard';

const schema = z.object({
  cover: z.custom<WizardAsset | null>().refine((asset) => asset !== null, 'Upload a cover image.'),
});
type Input = z.input<typeof schema>;
type Values = z.output<typeof schema>;

export default function Step3Cover(): React.JSX.Element {
  const { state, dispatch } = useWizard();
  const { goTo } = useWizardNavigation();
  const { watch, handleSubmit, setValue, formState: { errors } } = useForm<Input, unknown, Values>({
    resolver: zodResolver(schema),
    defaultValues: { cover: state.data.cover },
  });
  const cover = watch('cover');

  useEffect(() => {
    const subscription = watch(() => {
      dispatch({ type: 'SET_DATA', data: { cover: watch('cover') } });
    });
    return () => subscription.unsubscribe();
  }, [dispatch, watch]);

  const onSubmit = (values: Values) => {
    dispatch({ type: 'SET_DATA', data: { cover: values.cover } });
    dispatch({ type: 'SET_VALID', key: '3:cover', valid: true });
    goTo(3, 'gallery');
  };

  return (
    <form id="wizard-step-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <p className="text-xs leading-5 text-[#77766e]">Choose the main photo that represents this cluster across the Serenia website.</p>
      <UploadField
        label="Cluster cover"
        value={cover ? [cover] : []}
        onChange={(assets) => setValue('cover', assets[0] ?? null, { shouldValidate: true })}
        required
      />
      {errors.cover?.message && <p role="alert" className="text-[11px] text-red-600">{errors.cover.message}</p>}
    </form>
  );
}
