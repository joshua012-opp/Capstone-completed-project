import { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PROPERTY_AMENITY_GROUPS } from '../../../constants/options';
import FormField from '../FormField';
import MultiSelectChips from '../MultiSelectChips';
import type { PropertyTypeData } from '../../../types/clusterWizard';
import { useWizard } from '../WizardContext';
import { useWizardNavigation } from '../wizardNavigation';

const schema = z.object({ amenities: z.array(z.string()) });
type Values = z.infer<typeof schema>;
type Props = { draft: PropertyTypeData };

export default function Step4TypeAmenities({ draft }: Props): React.JSX.Element {
  const { dispatch } = useWizard();
  const { goTo } = useWizardNavigation();
  const draftRef = useRef(draft);
  const { control, watch, handleSubmit } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { amenities: draft.amenities },
  });

  useEffect(() => { draftRef.current = draft; }, [draft]);
  useEffect(() => {
    const subscription = watch((values) => {
      dispatch({
        type: 'SET_PROPERTY_DRAFT',
        propertyDraft: { ...draftRef.current, amenities: values.amenities ?? [] },
      });
    });
    return () => subscription.unsubscribe();
  }, [dispatch, watch]);

  const onSubmit = (values: Values) => {
    const propertyType = { ...draft, ...values };
    dispatch({ type: 'ADD_PROPERTY_TYPE', propertyType });
    dispatch({ type: 'SET_VALID', key: '4:type-amenities', valid: true });
    dispatch({ type: 'SET_VALID', key: '4:types-list', valid: true });
    goTo(4, 'types-list');
  };

  return (
    <form id="wizard-step-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {Object.entries(PROPERTY_AMENITY_GROUPS).map(([group, options]) => (
        <section key={group} className="space-y-3 rounded-xl border border-[#ecebe4] p-4">
          <h3 className="text-xs font-semibold text-[#414138]">{group}</h3>
          <Controller
            control={control}
            name="amenities"
            render={({ field }) => (
              <MultiSelectChips
                options={[...options]}
                value={field.value.filter((option) => options.includes(option))}
                onChange={(selectedGroup) => {
                  const otherGroups = field.value.filter((item) => !options.includes(item));
                  field.onChange([...otherGroups, ...selectedGroup]);
                }}
              />
            )}
          />
        </section>
      ))}
    </form>
  );
}
