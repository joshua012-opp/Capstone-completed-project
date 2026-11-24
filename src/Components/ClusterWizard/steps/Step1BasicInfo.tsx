import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import FormField, { inputClass, textareaClass } from '../FormField';
import { useWizard } from '../WizardContext';
import { useWizardNavigation } from '../wizardNavigation';

const schema = z.object({
  name: z.string().trim().min(2, 'Enter at least 2 characters.'),
  tagline: z.string().trim().min(2, 'Enter a short tagline.'),
  description: z.string().trim().min(10, 'Enter at least 10 characters.'),
});
type Values = z.infer<typeof schema>;

export default function Step1BasicInfo(): React.JSX.Element {
  const { state, dispatch } = useWizard();
  const { goTo } = useWizardNavigation();
  const { register, watch, handleSubmit, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: state.data.details,
  });

  useEffect(() => {
    const subscription = watch((values) => {
      dispatch({
        type: 'SET_DATA',
        data: {
          details: {
            name: values.name ?? '',
            tagline: values.tagline ?? '',
            description: values.description ?? '',
          },
        },
      });
    });
    return () => subscription.unsubscribe();
  }, [dispatch, watch]);

  const onSubmit = (values: Values) => {
    dispatch({ type: 'SET_DATA', data: { details: values } });
    dispatch({ type: 'SET_VALID', key: '1:basic-information', valid: true });
    goTo(1, 'location');
  };

  return (
    <form id="wizard-step-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <FormField label="Cluster name" required error={errors.name?.message}>
        <input {...register('name')} className={inputClass} placeholder="Enter cluster name" />
      </FormField>
      <FormField label="Tagline" required error={errors.tagline?.message}>
        <input {...register('tagline')} className={inputClass} placeholder="Add a short tagline" />
      </FormField>
      <FormField label="Description" required error={errors.description?.message}>
        <textarea {...register('description')} className={textareaClass} placeholder="Tell customers about this cluster" />
      </FormField>
    </form>
  );
}
