import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CLUSTER_GALLERY_CATEGORIES } from '../../../constants/options';
import UploadField from '../UploadField';
import { useWizard } from '../WizardContext';
import { useWizardNavigation } from '../wizardNavigation';
import type { WizardAsset } from '../../../types/clusterWizard';

const schema = z.object({
  gallery: z.record(z.string(), z.array(z.custom<WizardAsset>())),
}).refine(
  (value) => Object.values(value.gallery).reduce((total, images) => total + images.length, 0) >= 3,
  { message: 'Upload at least 3 gallery images across the categories.', path: ['gallery'] },
);
type Input = z.input<typeof schema>;
type Values = z.output<typeof schema>;

export default function Step3Gallery(): React.JSX.Element {
  const { state, dispatch } = useWizard();
  const { goTo } = useWizardNavigation();
  const [category, setCategory] = useState<string>(CLUSTER_GALLERY_CATEGORIES[0]);
  const { watch, handleSubmit, setValue, getValues, formState: { errors } } = useForm<Input, unknown, Values>({
    resolver: zodResolver(schema),
    defaultValues: { gallery: state.data.gallery },
  });
  const gallery = watch('gallery');
  const allImages = Object.values(gallery ?? {}).flat();

  useEffect(() => {
    const subscription = watch(() => {
      dispatch({ type: 'SET_DATA', data: { gallery: getValues('gallery') } });
    });
    return () => subscription.unsubscribe();
  }, [dispatch, getValues, watch]);

  const onSubmit = (values: Values) => {
    dispatch({ type: 'SET_DATA', data: { gallery: values.gallery } });
    dispatch({ type: 'SET_VALID', key: '3:gallery', valid: true });
    goTo(3, 'brochure');
  };

  const updateCategory = (assets: WizardAsset[]) => {
    const next = { ...getValues('gallery'), [category]: assets };
    setValue('gallery', next, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <form id="wizard-step-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <p className="text-xs leading-5 text-[#77766e]">Add at least 3 photos across the gallery categories. You can add more to any category.</p>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {CLUSTER_GALLERY_CATEGORIES.map((item) => (
          <button type="button" key={item} onClick={() => setCategory(item)} className={`shrink-0 rounded-full px-3 py-1.5 text-[10px] ${category === item ? 'bg-[#56593B] text-white' : 'border border-[#e4e3dc] text-[#77766e]'}`}>
            {item}
          </button>
        ))}
      </div>
      <UploadField
        label={`${category} photos`}
        value={gallery?.[category] ?? []}
        onChange={updateCategory}
        multiple
      />
      <p className="text-[10px] text-[#77766e]">{allImages.length} / 3 images uploaded</p>
      {(errors.gallery?.message || errors.gallery?.root?.message) && (
        <p role="alert" className="text-[11px] text-red-600">
          {(typeof errors.gallery?.message === 'string' && errors.gallery.message) || errors.gallery?.root?.message}
        </p>
      )}
    </form>
  );
}
