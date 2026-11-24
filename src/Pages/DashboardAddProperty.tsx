import { useEffect, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import DashboardResource from '../Components/Dashboard/DashboardResource';
import { useProperties } from '../hooks/useProperties';
import { addPropertyType } from '../services/propertyTypeService';
import type { MeasurementUnit } from '../types/serenia';

type FormValues = {
  clusterId: string;
  name: string;
  totalUnit: string;
  unitSize: string;
  unit: MeasurementUnit;
  bedrooms: string;
  bathrooms: string;
  floors: string;
  garage: string;
  basePrice: string;
  description: string;
};

const INITIAL_VALUES: FormValues = {
  clusterId: '',
  name: '',
  totalUnit: '1',
  unitSize: '',
  unit: 'm²',
  bedrooms: '1',
  bathrooms: '1',
  floors: '1',
  garage: '0',
  basePrice: '',
  description: '',
};

export default function DashboardAddPropertyPage(): React.JSX.Element {
  const [searchParams] = useSearchParams();
  const availableClusters = useProperties({ sort: 'name', status: 'opened' });
  const [values, setValues] = useState<FormValues>({
    ...INITIAL_VALUES,
    clusterId: searchParams.get('cluster') ?? '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (values.clusterId || !availableClusters.data?.length) return;
    setValues((current) => ({ ...current, clusterId: availableClusters.data?.[0]?.id ?? '' }));
  }, [availableClusters.data, values.clusterId]);

  const update = (key: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    const totalUnit = Number(values.totalUnit);
    const unitSize = Number(values.unitSize);
    const bedrooms = Number(values.bedrooms);
    const bathrooms = Number(values.bathrooms);
    const floors = Number(values.floors);
    const garage = Number(values.garage);
    const basePrice = Number(values.basePrice);
    if (!values.clusterId || !values.name.trim()) {
      setError('Select a cluster and enter a property type name.');
      return;
    }
    if (![totalUnit, unitSize, bedrooms, bathrooms, floors, garage, basePrice].every(Number.isFinite)
      || ![totalUnit, bedrooms, bathrooms, floors, garage].every(Number.isInteger)
      || totalUnit < 1 || unitSize <= 0 || bedrooms < 0 || bathrooms < 0 || floors < 1 || garage < 0 || basePrice <= 0) {
      setError('Enter valid unit, size, room, floor, garage, and price values.');
      return;
    }

    setSubmitting(true);
    try {
      await addPropertyType({
        clusterId: values.clusterId,
        name: values.name.trim(),
        totalUnit,
        unitSize: { value: unitSize, unit: values.unit },
        lotSize: { value: unitSize, unit: values.unit },
        bedrooms,
        bathrooms,
        floors,
        garage,
        availability: 'available',
        description: values.description.trim(),
        pricing: {
          basePrice,
          monthlyInstallment: 0,
          downPaymentPercent: 0,
          loanTenureYears: 10,
          interestRatePercent: 0,
          interestFixedYears: 0,
          paymentMethods: [],
          additionalFees: [],
          specialOffers: [],
        },
        cover: null,
        gallery: [],
        floorPlans: [],
        preview360Url: '',
        amenities: { indoor: [], outdoor: [], safety: [] },
      });
      setSuccess('Property type added. The cluster inventory and dashboard totals have been updated.');
      setValues((current) => ({ ...INITIAL_VALUES, clusterId: current.clusterId }));
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to save this property type.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <section className="rounded-xl border border-[#ecebe4] bg-white p-5 shadow-[0_1px_2px_rgba(35,34,25,0.025)] sm:p-7">
        <h2 className="text-base font-semibold text-[#2d2d25]">Add a property type</h2>
        <p className="mt-1.5 text-xs leading-5 text-[#77766e]">
          Add a unit type to an opened cluster. The dashboard will update its inventory and availability totals.
        </p>

        <DashboardResource resource={availableClusters} sectionName="opened clusters" skeleton="summary">
          {(clusters) => {
            if (clusters.length === 0) {
              return <p className="mt-5 rounded-lg bg-[#f7f6f1] p-4 text-xs text-[#77766e]">There are no opened clusters available. Publish a cluster before adding a property type.</p>;
            }
            return (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-1.5 text-xs font-medium text-[#55554d] sm:col-span-2">
                    Cluster
                    <select required value={values.clusterId} onChange={(event) => update('clusterId', event.target.value)} className="h-10 w-full rounded-lg border border-[#e4e3dc] bg-white px-3 text-xs font-normal outline-none focus:border-[#a29b45]">
                      {clusters.map((cluster) => <option key={cluster.id} value={cluster.id}>{cluster.name}</option>)}
                    </select>
                  </label>
                  <Field label="Property type name" value={values.name} onChange={(value) => update('name', value)} placeholder="e.g. Type A" type="text" required />
                  <Field label="Total units" value={values.totalUnit} onChange={(value) => update('totalUnit', value)} type="number" min="1" step="1" required />
                  <label className="space-y-1.5 text-xs font-medium text-[#55554d]">
                    Unit size
                    <div className="flex gap-2">
                      <input required type="number" min="0.1" step="any" value={values.unitSize} onChange={(event) => update('unitSize', event.target.value)} className="h-10 min-w-0 flex-1 rounded-lg border border-[#e4e3dc] px-3 text-xs font-normal outline-none focus:border-[#a29b45]" />
                      <select value={values.unit} onChange={(event) => update('unit', event.target.value as MeasurementUnit)} className="h-10 rounded-lg border border-[#e4e3dc] bg-white px-3 text-xs outline-none focus:border-[#a29b45]">
                        <option value="m²">m²</option>
                        <option value="ft²">ft²</option>
                      </select>
                    </div>
                  </label>
                  <Field label="Base price (USD)" value={values.basePrice} onChange={(value) => update('basePrice', value)} type="number" min="1" step="any" required />
                  <Field label="Bedrooms" value={values.bedrooms} onChange={(value) => update('bedrooms', value)} type="number" min="0" step="1" required />
                  <Field label="Bathrooms" value={values.bathrooms} onChange={(value) => update('bathrooms', value)} type="number" min="0" step="1" required />
                  <Field label="Floors" value={values.floors} onChange={(value) => update('floors', value)} type="number" min="1" step="1" required />
                  <Field label="Garage spaces" value={values.garage} onChange={(value) => update('garage', value)} type="number" min="0" step="1" required />
                </div>
                <label className="block space-y-1.5 text-xs font-medium text-[#55554d]">
                  Description <span className="font-normal text-[#929188]">(optional)</span>
                  <textarea value={values.description} onChange={(event) => update('description', event.target.value)} rows={3} className="w-full resize-y rounded-lg border border-[#e4e3dc] px-3 py-2 text-xs font-normal outline-none focus:border-[#a29b45]" />
                </label>
                {error && <p role="alert" className="rounded-lg bg-[#fff1ef] px-3 py-2 text-xs text-[#b63d34]">{error}</p>}
                {success && <p role="status" className="rounded-lg bg-[#eef5ec] px-3 py-2 text-xs text-[#4d8558]">{success}</p>}
                <div className="flex justify-end border-t border-[#f0efe9] pt-4">
                  <button disabled={submitting} type="submit" className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#56593B] px-5 text-xs font-medium text-white hover:bg-[#474a31] disabled:cursor-wait disabled:opacity-60">
                    {submitting ? 'Saving…' : 'Save property type'}
                  </button>
                </div>
              </form>
            );
          }}
        </DashboardResource>
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'number',
  min,
  step,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  min?: string;
  step?: string;
  required?: boolean;
}): React.JSX.Element {
  return (
    <label className="space-y-1.5 text-xs font-medium text-[#55554d]">
      {label}
      <input required={required} type={type} min={min} step={step ?? (type === 'number' ? 'any' : undefined)} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="h-10 w-full rounded-lg border border-[#e4e3dc] px-3 text-xs font-normal outline-none focus:border-[#a29b45]" />
    </label>
  );
}
