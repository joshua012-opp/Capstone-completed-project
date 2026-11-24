import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { z } from 'zod';
import { CLUSTER_TYPES, DOOR_WINDOW_TYPES, FLOOR_TYPES } from '../../../constants/options';
import FormField, { inputClass } from '../FormField';
import { useWizard } from '../WizardContext';
import { useWizardNavigation } from '../wizardNavigation';

const schema = z.object({
  clusterType: z.string().min(1, 'Select a cluster type.'),
  floorType: z.string().min(1, 'Select a floor type.'),
  singleFloorSize: z.number().positive('Enter a size greater than zero.'),
  doorWindowType: z.string().min(1, 'Select a door and window type.'),
  electricityCapacity: z.number().positive('Enter the capacity in VA.'),
  totalPropertyTypes: z.number().int().positive('Enter at least one property type.'),
  totalUnits: z.number().int().positive('Enter at least one unit.'),
  propertyTypesAvailable: z.array(z.string()).min(1, 'Select at least one property type.'),
  clusterSizeUnit: z.enum(['m²', 'ft²']),
  clusterSize: z.number().positive('Enter the cluster size.'),
});
type Values = z.infer<typeof schema>;

const availableTypes = ['House', 'Villa', 'Townhouse', 'Apartment'];

export default function Step2Specifications(): React.JSX.Element {
  const { state, dispatch } = useWizard();
  const { goTo } = useWizardNavigation();
  const [noticeVisible, setNoticeVisible] = useState(true);
  const { register, watch, handleSubmit, setValue, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: state.data.specifications,
  });
  const selectedTypes = watch('propertyTypesAvailable');

  useEffect(() => {
    const subscription = watch((values) => {
      dispatch({
        type: 'SET_DATA',
        data: {
          specifications: {
            clusterType: values.clusterType ?? '',
            floorType: values.floorType ?? '',
            singleFloorSize: values.singleFloorSize ?? 0,
            doorWindowType: values.doorWindowType ?? '',
            electricityCapacity: values.electricityCapacity ?? 0,
            totalPropertyTypes: values.totalPropertyTypes ?? 0,
            totalUnits: values.totalUnits ?? 0,
            propertyTypesAvailable: values.propertyTypesAvailable ?? [],
            clusterSizeUnit: values.clusterSizeUnit ?? 'm²',
            clusterSize: values.clusterSize ?? 0,
          },
        },
      });
    });
    return () => subscription.unsubscribe();
  }, [dispatch, watch]);

  const toggleType = (type: string) => {
    const next = selectedTypes.includes(type)
      ? selectedTypes.filter((item) => item !== type)
      : [...selectedTypes, type];
    setValue('propertyTypesAvailable', next, { shouldValidate: true, shouldDirty: true });
  };

  const onSubmit = (values: Values) => {
    dispatch({ type: 'SET_DATA', data: { specifications: values } });
    dispatch({ type: 'SET_VALID', key: '2:detail-specification', valid: true });
    goTo(2, 'amenities');
  };

  return (
    <form id="wizard-step-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Cluster type" required error={errors.clusterType?.message}>
          <select {...register('clusterType')} className={inputClass}>
            <option value="">Select type</option>
            {CLUSTER_TYPES.map((option) => <option key={option}>{option}</option>)}
          </select>
        </FormField>
        <FormField label="Floor type" required error={errors.floorType?.message}>
          <select {...register('floorType')} className={inputClass}>
            <option value="">Select floor type</option>
            {FLOOR_TYPES.map((option) => <option key={option}>{option}</option>)}
          </select>
        </FormField>
        <FormField label="Single floor size (m²)" required error={errors.singleFloorSize?.message}>
          <input type="number" min="1" {...register('singleFloorSize', { valueAsNumber: true })} className={inputClass} placeholder="Enter size" />
        </FormField>
        <FormField label="Door / window type" required error={errors.doorWindowType?.message}>
          <select {...register('doorWindowType')} className={inputClass}>
            <option value="">Select type</option>
            {DOOR_WINDOW_TYPES.map((option) => <option key={option}>{option}</option>)}
          </select>
        </FormField>
        <FormField label="Electricity capacity (VA)" required error={errors.electricityCapacity?.message}>
          <input type="number" min="1" {...register('electricityCapacity', { valueAsNumber: true })} className={inputClass} placeholder="e.g. 2200" />
        </FormField>
        <FormField label="Total property types" required error={errors.totalPropertyTypes?.message}>
          <input type="number" min="1" {...register('totalPropertyTypes', { valueAsNumber: true })} className={inputClass} />
        </FormField>
        <FormField label="Total units" required error={errors.totalUnits?.message}>
          <input type="number" min="1" {...register('totalUnits', { valueAsNumber: true })} className={inputClass} />
        </FormField>
        <FormField label="Cluster size" required error={errors.clusterSize?.message}>
          <div className="flex gap-2">
            <select {...register('clusterSizeUnit')} className={`${inputClass} max-w-24`}>
              <option value="m²">m²</option>
              <option value="ft²">ft²</option>
            </select>
            <input type="number" min="1" {...register('clusterSize', { valueAsNumber: true })} className={inputClass} placeholder="Enter size" />
          </div>
        </FormField>
      </div>
      <FormField label="Property types available" required error={errors.propertyTypesAvailable?.message}>
        <div className="flex flex-wrap gap-2">
          {availableTypes.map((type) => {
            const selected = selectedTypes.includes(type);
            return (
              <button
                type="button"
                key={type}
                aria-pressed={selected}
                onClick={() => toggleType(type)}
                className={`rounded-full border px-3 py-1.5 text-[11px] ${selected ? 'border-[#7b8053] bg-[#f0f1e7] text-[#555d36]' : 'border-[#e2e1da] bg-white text-[#77766e]'}`}
              >
                {type}{selected && <X className="ml-1 inline h-3 w-3" />}
              </button>
            );
          })}
        </div>
      </FormField>
      {noticeVisible && (
        <div className="flex items-start gap-3 rounded-xl border border-[#f1d98c] bg-[#fff9e7] p-3.5 text-[#6b5b2b]">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#eed06a] text-[10px] font-bold">!</span>
          <p className="flex-1 text-[10px] leading-5"><strong>Important</strong><br />The total property types and units are preliminary estimates and will be recalculated by the system based on the added data.</p>
          <button type="button" aria-label="Dismiss important notice" onClick={() => setNoticeVisible(false)} className="text-sm">×</button>
        </div>
      )}
    </form>
  );
}
