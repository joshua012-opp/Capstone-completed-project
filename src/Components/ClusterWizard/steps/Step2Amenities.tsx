import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { ChevronDown, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { AMENITY_TYPES, DEFAULT_AMENITIES } from '../../../constants/options';
import FormField, { inputClass, textareaClass } from '../FormField';
import UploadField from '../UploadField';
import { useWizard } from '../WizardContext';
import { useWizardNavigation } from '../wizardNavigation';

const amenitySchema = z.object({
  id: z.string(),
  type: z.string().trim().min(1, 'Select an amenity type.'),
  image: z.any().nullable(),
  description: z.string().trim().min(4, 'Enter a short description.'),
});
const schema = z.object({ amenities: z.array(amenitySchema).min(1) });
type Values = z.infer<typeof schema>;

export default function Step2Amenities(): React.JSX.Element {
  const { state, dispatch } = useWizard();
  const { goTo } = useWizardNavigation();
  const { register, control, watch, handleSubmit, setValue, getValues, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { amenities: state.data.amenities },
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'amenities' });

  useEffect(() => {
    const subscription = watch((values) => {
      if (values.amenities) dispatch({ type: 'SET_DATA', data: { amenities: values.amenities as Values['amenities'] } });
    });
    return () => subscription.unsubscribe();
  }, [dispatch, watch]);

  const onSubmit = (values: Values) => {
    dispatch({ type: 'SET_DATA', data: { amenities: values.amenities } });
    dispatch({ type: 'SET_VALID', key: '2:amenities', valid: true });
    goTo(3, 'cover');
  };

  return (
    <form id="wizard-step-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <details className="group rounded-xl border border-[#ecebe4] bg-white">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 [&::-webkit-details-marker]:hidden">
          <span>
            <span className="block text-xs font-semibold text-[#414138]">Default amenities</span>
            <span className="mt-1 block text-[10px] text-[#85847b]">
              Amenities that have been set for each cluster,{' '}
              <Link to="/dashboard/settings" className="font-medium text-[#646747] underline underline-offset-2">
                view settings
              </Link>
            </span>
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 text-[#85847b] transition-transform group-open:rotate-180" />
        </summary>
        <ul className="grid gap-2 border-t border-[#eeede7] px-4 py-3 sm:grid-cols-2">
          {DEFAULT_AMENITIES.map((amenity) => (
            <li key={amenity} className="flex items-center gap-2 text-[10px] text-[#64645b]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#85895c]" />
              {amenity}
            </li>
          ))}
        </ul>
      </details>
      {fields.map((field, index) => (
        <section key={field.id} className="rounded-xl border border-[#ecebe4] bg-[#fbfbf8] p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xs font-semibold text-[#414138]">Amenities {index + 1}</h3>
            {index > 0 && (
              <button type="button" onClick={() => remove(index)} aria-label={`Delete amenities ${index + 1}`} className="flex h-8 w-8 items-center justify-center rounded-lg text-red-500 hover:bg-red-50">
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Amenities type" required error={errors.amenities?.[index]?.type?.message}>
              <select {...register(`amenities.${index}.type`)} className={inputClass}>
                <option value="">Select amenity type</option>
                {AMENITY_TYPES.map((type) => <option key={type}>{type}</option>)}
              </select>
            </FormField>
            <FormField label="Description" required error={errors.amenities?.[index]?.description?.message}>
              <textarea {...register(`amenities.${index}.description`)} className={textareaClass} placeholder="Describe this amenity" />
            </FormField>
            <div className="md:col-span-2">
              <UploadField
                label="Image"
                compact
                value={watch(`amenities.${index}.image`) ? [watch(`amenities.${index}.image`)] : []}
                onChange={(assets) => setValue(`amenities.${index}.image`, assets[0] ?? null, { shouldValidate: true })}
              />
            </div>
          </div>
        </section>
      ))}
      <button
        type="button"
        onClick={() => append({ id: `amenity-${crypto.randomUUID()}`, type: '', image: null, description: '' })}
        className="inline-flex items-center gap-2 rounded-lg border border-dashed border-[#bdbda9] px-4 py-2.5 text-xs font-medium text-[#646747] hover:bg-[#f7f7f0]"
      >
        <Plus className="h-4 w-4" /> Add amenities
      </button>
    </form>
  );
}
