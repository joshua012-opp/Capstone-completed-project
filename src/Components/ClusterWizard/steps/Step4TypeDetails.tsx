import { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PROPERTY_AVAILABILITY_OPTIONS } from '../../../constants/options';
import FormField, { inputClass, textareaClass } from '../FormField';
import NumberStepper from '../NumberStepper';
import type { PropertyTypeData } from '../../../types/clusterWizard';
import { useWizard } from '../WizardContext';
import { useWizardNavigation } from '../wizardNavigation';

const schema = z.object({
  name: z.string().trim().min(1, 'Enter a property type name.'),
  totalUnits: z.number().int().positive('Enter at least one unit.'),
  unitSize: z.object({ unit: z.enum(['m²', 'ft²']), value: z.number().positive('Enter a size.') }),
  lotSize: z.object({ unit: z.enum(['m²', 'ft²']), value: z.number().positive('Enter a size.') }),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().int().min(0),
  floors: z.number().int().positive(),
  garage: z.number().int().min(0),
  availability: z.enum(['Available', 'Sold out', 'Coming soon']),
  description: z.string().trim().min(10, 'Enter at least 10 characters.'),
});
type Values = z.infer<typeof schema>;
type Props = { draft: PropertyTypeData };

export default function Step4TypeDetails({ draft }: Props): React.JSX.Element {
  const { dispatch } = useWizard();
  const { goTo } = useWizardNavigation();
  const draftRef = useRef(draft);
  const { register, control, watch, handleSubmit, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: draft.name,
      totalUnits: draft.totalUnits,
      unitSize: draft.unitSize,
      lotSize: draft.lotSize,
      bedrooms: draft.bedrooms,
      bathrooms: draft.bathrooms,
      floors: draft.floors,
      garage: draft.garage,
      availability: draft.availability,
      description: draft.description,
    },
  });

  useEffect(() => { draftRef.current = draft; }, [draft]);
  useEffect(() => {
    const subscription = watch((values) => {
      const current = draftRef.current;
      dispatch({
        type: 'SET_PROPERTY_DRAFT',
        propertyDraft: {
          ...current,
          ...values,
          unitSize: values.unitSize ?? current.unitSize,
          lotSize: values.lotSize ?? current.lotSize,
        } as PropertyTypeData,
      });
    });
    return () => subscription.unsubscribe();
  }, [dispatch, watch]);

  const onSubmit = (values: Values) => {
    dispatch({ type: 'SET_PROPERTY_DRAFT', propertyDraft: { ...draft, ...values } });
    dispatch({ type: 'SET_VALID', key: '4:type-details', valid: true });
    goTo(4, 'type-pricing');
  };

  return (
    <form id="wizard-step-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Property type name" required error={errors.name?.message}>
          <input {...register('name')} className={inputClass} placeholder="Ex: Type A" />
        </FormField>
        <FormField label="Total unit" required error={errors.totalUnits?.message}>
          <Controller control={control} name="totalUnits" render={({ field }) => <NumberStepper value={field.value} onChange={field.onChange} min={1} />} />
        </FormField>
        <FormField label="Unit size" required error={errors.unitSize?.value?.message}>
          <div className="flex gap-2">
            <select {...register('unitSize.unit')} className={`${inputClass} max-w-24`}>
              <option value="m²">m²</option><option value="ft²">ft²</option>
            </select>
            <Controller control={control} name="unitSize.value" render={({ field }) => <NumberStepper value={field.value} onChange={field.onChange} min={1} />} />
          </div>
        </FormField>
        <FormField label="Lot size" required error={errors.lotSize?.value?.message}>
          <div className="flex gap-2">
            <select {...register('lotSize.unit')} className={`${inputClass} max-w-24`}>
              <option value="m²">m²</option><option value="ft²">ft²</option>
            </select>
            <Controller control={control} name="lotSize.value" render={({ field }) => <NumberStepper value={field.value} onChange={field.onChange} min={1} />} />
          </div>
        </FormField>
        <FormField label="Bedroom">
          <Controller control={control} name="bedrooms" render={({ field }) => <NumberStepper value={field.value} onChange={field.onChange} />} />
        </FormField>
        <FormField label="Bathroom">
          <Controller control={control} name="bathrooms" render={({ field }) => <NumberStepper value={field.value} onChange={field.onChange} />} />
        </FormField>
        <FormField label="Floor">
          <Controller control={control} name="floors" render={({ field }) => <NumberStepper value={field.value} onChange={field.onChange} min={1} />} />
        </FormField>
        <FormField label="Garage">
          <Controller control={control} name="garage" render={({ field }) => <NumberStepper value={field.value} onChange={field.onChange} />} />
        </FormField>
        <FormField label="Availability" required error={errors.availability?.message}>
          <select {...register('availability')} className={inputClass}>
            {PROPERTY_AVAILABILITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </FormField>
        <div className="sm:col-span-2">
          <FormField label="Description" required error={errors.description?.message}>
            <textarea {...register('description')} className={textareaClass} placeholder="Describe this property type" />
          </FormField>
        </div>
      </div>
    </form>
  );
}
