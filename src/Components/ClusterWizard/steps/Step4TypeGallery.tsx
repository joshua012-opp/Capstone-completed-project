import { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { PROPERTY_GALLERY_CATEGORIES } from '../../../constants/options';
import UploadField from '../UploadField';
import { useWizard } from '../WizardContext';
import { useWizardNavigation } from '../wizardNavigation';
import type { PropertyTypeData, WizardAsset } from '../../../types/clusterWizard';

const schema = z.object({
  cover: z.custom<WizardAsset | null>().refine((asset) => asset !== null, 'Upload a cover image for this property type.'),
  gallery: z.record(z.string(), z.array(z.custom<WizardAsset>())),
});
type Input = z.input<typeof schema>;
type Values = z.output<typeof schema>;
type Props = { draft: PropertyTypeData };

export default function Step4TypeGallery({ draft }: Props): React.JSX.Element {
  const { dispatch } = useWizard();
  const { goTo } = useWizardNavigation();
  const [category, setCategory] = useState<string>(PROPERTY_GALLERY_CATEGORIES[0]);
  const draftRef = useRef(draft);
  const { watch, handleSubmit, setValue, getValues, formState: { errors } } = useForm<Input, unknown, Values>({
    resolver: zodResolver(schema),
    defaultValues: { cover: draft.cover, gallery: draft.gallery },
  });
  const cover = watch('cover');
  const gallery = watch('gallery');

  useEffect(() => { draftRef.current = draft; }, [draft]);
  useEffect(() => {
    const subscription = watch(() => {
      const currentValues = getValues();
      dispatch({
        type: 'SET_PROPERTY_DRAFT',
        propertyDraft: {
          ...draftRef.current,
          cover: currentValues.cover ?? draftRef.current.cover,
          gallery: currentValues.gallery,
        },
      });
    });
    return () => subscription.unsubscribe();
  }, [dispatch, getValues, watch]);

  const onSubmit = (values: Values) => {
    dispatch({ type: 'SET_PROPERTY_DRAFT', propertyDraft: { ...draft, ...values } });
    dispatch({ type: 'SET_VALID', key: '4:type-gallery', valid: true });
    goTo(4, 'type-floor-plan');
  };

  return (
    <form id="wizard-step-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <UploadField
        label="Cover"
        required
        value={cover ? [cover] : []}
        onChange={(assets) => setValue('cover', assets[0] ?? null, { shouldValidate: true })}
      />
      {errors.cover?.message && <p role="alert" className="text-[11px] text-red-600">{errors.cover.message}</p>}
      <div className="border-t border-[#eeede7] pt-5">
        <h3 className="mb-3 text-xs font-semibold text-[#414138]">Gallery</h3>
        <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
          {PROPERTY_GALLERY_CATEGORIES.map((item) => (
            <button type="button" key={item} onClick={() => setCategory(item)} className={`shrink-0 rounded-full px-3 py-1.5 text-[10px] ${category === item ? 'bg-[#56593B] text-white' : 'border border-[#e4e3dc] text-[#77766e]'}`}>
              {item}
            </button>
          ))}
        </div>
        <UploadField
          label={`${category} photos`}
          value={gallery?.[category] ?? []}
          multiple
          onChange={(assets) => setValue('gallery', { ...getValues('gallery'), [category]: assets }, { shouldValidate: true })}
        />
      </div>
    </form>
  );
}
