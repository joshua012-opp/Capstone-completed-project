import { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { z } from 'zod';
import type { FloorPoint, PropertyTypeData, WizardAsset } from '../../../types/clusterWizard';
import FloorPointModal from '../FloorPointModal';
import FormField, { inputClass } from '../FormField';
import UploadField from '../UploadField';
import { emptyFloorPlan } from '../wizardData';
import { useWizard } from '../WizardContext';
import { useWizardNavigation } from '../wizardNavigation';

const floorSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.custom<WizardAsset | null>().refine((asset) => asset !== null, 'Upload a floor-plan image.'),
  points: z.array(z.any()),
});
const schema = z.object({
  floorPlans: z.array(floorSchema).min(1),
  preview360: z.string().trim().url('Enter a valid embedded URL.').or(z.literal('')),
});
type Input = z.input<typeof schema>;
type Values = z.output<typeof schema>;
type Props = { draft: PropertyTypeData };

export default function Step4TypeFloorPlan({ draft }: Props): React.JSX.Element {
  const { dispatch } = useWizard();
  const { goTo } = useWizardNavigation();
  const draftRef = useRef(draft);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [selectedFloorId, setSelectedFloorId] = useState<string | null>(null);
  const [pendingPosition, setPendingPosition] = useState({ x: 50, y: 50 });
  const { register, watch, handleSubmit, setValue, getValues, formState: { errors } } = useForm<Input, unknown, Values>({
    resolver: zodResolver(schema),
    defaultValues: { floorPlans: draft.floorPlans, preview360: draft.preview360 },
  });
  const floorPlans = watch('floorPlans');

  useEffect(() => { draftRef.current = draft; }, [draft]);
  useEffect(() => {
    const subscription = watch(() => {
      const currentValues = getValues();
      dispatch({
        type: 'SET_PROPERTY_DRAFT',
        propertyDraft: {
          ...draftRef.current,
          floorPlans: currentValues.floorPlans,
          preview360: currentValues.preview360,
        },
      });
    });
    return () => subscription.unsubscribe();
  }, [dispatch, getValues, watch]);

  const onSubmit = (values: Values) => {
    dispatch({ type: 'SET_PROPERTY_DRAFT', propertyDraft: { ...draft, ...values } });
    dispatch({ type: 'SET_VALID', key: '4:type-floor-plan', valid: true });
    goTo(4, 'type-amenities');
  };

  const updateFloorImage = (index: number, assets: WizardAsset[]) => {
    const next = getValues('floorPlans').map((floor, floorIndex) => floorIndex === index ? { ...floor, image: assets[0] ?? null } : floor);
    setValue('floorPlans', next, { shouldValidate: true, shouldDirty: true });
  };

  const addFloor = () => {
    setValue('floorPlans', [...getValues('floorPlans'), emptyFloorPlan(getValues('floorPlans').length)], { shouldDirty: true, shouldValidate: true });
  };

  const addPoint = (floorId: string, values: { room: string; description: string }) => {
    const floors = getValues('floorPlans');
    const floor = floors.find((item) => item.id === floorId);
    if (!floor) return;
    const point: FloorPoint = {
      id: `point-${crypto.randomUUID()}`,
      number: floor.points.length + 1,
      room: values.room,
      description: values.description,
      ...pendingPosition,
    };
    setValue('floorPlans', floors.map((item) => item.id === floorId ? { ...item, points: [...item.points, point] } : item), { shouldDirty: true });
    setSelectedFloorId(null);
  };

  return (
    <>
      <form id="wizard-step-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {floorPlans.map((floor, index) => (
          <section key={floor.id} className="rounded-xl border border-[#ecebe4] bg-white p-4">
            <button type="button" onClick={() => setExpanded((current) => ({ ...current, [floor.id]: !current[floor.id] }))} className="mb-3 flex w-full items-center justify-between text-left">
              <span className="text-xs font-semibold text-[#414138]">{floor.name}</span>
              {expanded[floor.id] ? <ChevronUp className="h-4 w-4 text-[#77766e]" /> : <ChevronDown className="h-4 w-4 text-[#77766e]" />}
            </button>
            {expanded[floor.id] && (
              <div className="space-y-4">
                <UploadField label={`${floor.name} floor-plan image`} value={floor.image ? [floor.image] : []} onChange={(assets) => updateFloorImage(index, assets)} />
                {floor.image?.preview && (
                  <div className="relative overflow-hidden rounded-lg border border-[#e5e4dc]">
                    <button type="button" onClick={(event) => {
                      const bounds = event.currentTarget.getBoundingClientRect();
                      setPendingPosition({
                        x: ((event.clientX - bounds.left) / bounds.width) * 100,
                        y: ((event.clientY - bounds.top) / bounds.height) * 100,
                      });
                      setSelectedFloorId(floor.id);
                    }} className="relative block w-full cursor-crosshair">
                      <img src={floor.image.preview} alt={`${floor.name} plan`} className="max-h-80 w-full object-contain" />
                      {floor.points.map((point) => (
                        <span key={point.id} className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-[#56593B] text-[10px] font-semibold text-white shadow" style={{ left: `${point.x}%`, top: `${point.y}%` }}>
                          {point.number}
                        </span>
                      ))}
                    </button>
                    <p className="bg-[#fafaf7] px-3 py-2 text-[10px] text-[#85847b]">Click anywhere to add point</p>
                  </div>
                )}
                {floor.points.length > 0 && (
                  <ol className="space-y-2">
                    {floor.points.map((point) => (
                      <li key={point.id} className="flex items-start gap-2 rounded-lg bg-[#fafaf7] p-2.5 text-[10px]">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#56593B] text-white">{point.number}</span>
                        <span><strong>{point.room}</strong><br />{point.description}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            )}
          </section>
        ))}
        {errors.floorPlans?.message && <p role="alert" className="text-[11px] text-red-600">{errors.floorPlans.message}</p>}
        <button type="button" onClick={addFloor} className="inline-flex items-center gap-2 rounded-lg border border-dashed border-[#bdbda9] px-4 py-2.5 text-xs font-medium text-[#646747]">
          <Plus className="h-4 w-4" /> Add floor
        </button>
        <FormField label="360 preview embedded link" error={errors.preview360?.message}>
          <input {...register('preview360')} className={inputClass} placeholder="https://..." />
        </FormField>
      </form>
      {selectedFloorId && (
        <FloorPointModal
          number={(floorPlans.find((floor) => floor.id === selectedFloorId)?.points.length ?? 0) + 1}
          onClose={() => setSelectedFloorId(null)}
          onConfirm={(values) => addPoint(selectedFloorId, values)}
        />
      )}
    </>
  );
}
