import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CITIES_BY_COUNTRY, COUNTRY_OPTIONS } from '../../../constants/options';
import FormField, { inputClass, textareaClass } from '../FormField';
import MapPinPicker from '../MapPinPicker';
import { useWizard } from '../WizardContext';
import { useWizardNavigation } from '../wizardNavigation';

const schema = z.object({
  country: z.string().min(1, 'Select a country.'),
  city: z.string().trim().min(1, 'Enter a city.'),
  district: z.string().trim().min(1, 'Enter a district or area.'),
  address: z.string().trim().min(5, 'Enter the full address.'),
});
type Values = z.infer<typeof schema>;

export default function Step1Location(): React.JSX.Element {
  const { state, dispatch } = useWizard();
  const { goTo } = useWizardNavigation();
  const { register, watch, handleSubmit, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      country: state.data.location.country,
      city: state.data.location.city,
      district: state.data.location.district,
      address: state.data.location.address,
    },
  });
  const mapPin = state.data.location.mapPin;
  const country = watch('country');

  useEffect(() => {
    const subscription = watch((values) => {
      dispatch({
        type: 'SET_DATA',
        data: {
          location: {
            ...state.data.location,
            country: values.country ?? '',
            city: values.city ?? '',
            district: values.district ?? '',
            address: values.address ?? '',
          },
        },
      });
    });
    return () => subscription.unsubscribe();
  }, [dispatch, state.data.location.mapPin, watch]);

  const onSubmit = (values: Values) => {
    dispatch({ type: 'SET_DATA', data: { location: { ...state.data.location, ...values } } });
    dispatch({ type: 'SET_VALID', key: '1:location', valid: true });
    goTo(2, 'detail-specification');
  };

  return (
    <form id="wizard-step-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Country" required error={errors.country?.message}>
          <select {...register('country')} className={inputClass}>
            {COUNTRY_OPTIONS.map((option) => <option key={option.name} value={option.name}>{option.flag} {option.name}</option>)}
          </select>
        </FormField>
        <FormField label="City" required error={errors.city?.message}>
          <>
            <input {...register('city')} list="cluster-city-options" className={inputClass} placeholder="Type or select a city" />
            <datalist id="cluster-city-options">
              {(CITIES_BY_COUNTRY[country] ?? []).map((city) => <option key={city} value={city} />)}
            </datalist>
          </>
        </FormField>
      </div>
      <FormField label="District / area" required error={errors.district?.message}>
        <input {...register('district')} className={inputClass} placeholder="Enter district or area" />
      </FormField>
      <FormField label="Full address" required error={errors.address?.message}>
        <textarea {...register('address')} className={textareaClass} placeholder="Enter street, area, and other address details" />
      </FormField>
      <div>
        <p className="mb-2 text-xs font-medium text-[#45453d]">Map PIN <span className="font-normal text-[#99988f]">(optional)</span></p>
        <MapPinPicker
          value={mapPin}
          onChange={(pin) => dispatch({
            type: 'SET_DATA',
            data: { location: { ...state.data.location, mapPin: pin } },
          })}
        />
      </div>
    </form>
  );
}
