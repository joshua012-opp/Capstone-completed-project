import { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ADDITIONAL_FEES, LOAN_TENURES, PAYMENT_METHODS, SPECIAL_OFFERS } from '../../../constants/options';
import FormField, { inputClass } from '../FormField';
import MultiSelectChips from '../MultiSelectChips';
import type { PropertyTypeData } from '../../../types/clusterWizard';
import { useWizard } from '../WizardContext';
import { useWizardNavigation } from '../wizardNavigation';

const schema = z.object({
  basePrice: z.number().positive('Enter a base price.'),
  monthlyInstallment: z.number().positive('Enter a monthly installment.'),
  downPaymentPercent: z.number().min(0).max(100),
  loanTenure: z.number().positive(),
  interestRate: z.number().min(0),
  fixedPeriodYears: z.number().positive(),
  paymentMethods: z.array(z.string()).min(1, 'Select at least one payment method.'),
  additionalFees: z.array(z.string()),
  specialOffers: z.array(z.string()),
});
type Values = z.infer<typeof schema>;
type Props = { draft: PropertyTypeData };

export default function Step4TypePricing({ draft }: Props): React.JSX.Element {
  const { dispatch } = useWizard();
  const { goTo } = useWizardNavigation();
  const draftRef = useRef(draft);
  const { register, control, watch, handleSubmit, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      basePrice: draft.basePrice,
      monthlyInstallment: draft.monthlyInstallment,
      downPaymentPercent: draft.downPaymentPercent,
      loanTenure: draft.loanTenure,
      interestRate: draft.interestRate,
      fixedPeriodYears: draft.fixedPeriodYears,
      paymentMethods: draft.paymentMethods,
      additionalFees: draft.additionalFees,
      specialOffers: draft.specialOffers,
    },
  });

  useEffect(() => { draftRef.current = draft; }, [draft]);
  useEffect(() => {
    const subscription = watch((values) => {
      dispatch({ type: 'SET_PROPERTY_DRAFT', propertyDraft: { ...draftRef.current, ...values } as PropertyTypeData });
    });
    return () => subscription.unsubscribe();
  }, [dispatch, watch]);

  const onSubmit = (values: Values) => {
    dispatch({ type: 'SET_PROPERTY_DRAFT', propertyDraft: { ...draft, ...values } });
    dispatch({ type: 'SET_VALID', key: '4:type-pricing', valid: true });
    goTo(4, 'type-gallery');
  };

  return (
    <form id="wizard-step-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Base price" required error={errors.basePrice?.message}>
          <div className="flex h-10 items-center rounded-lg border border-[#e4e3dc] bg-white px-3">
            <span className="mr-2 text-xs text-[#8c8b82]">$</span>
            <input type="number" min="1" {...register('basePrice', { valueAsNumber: true })} className="h-full min-w-0 flex-1 text-xs outline-none" />
          </div>
        </FormField>
        <FormField label="Monthly installment" required error={errors.monthlyInstallment?.message}>
          <div className="flex h-10 items-center rounded-lg border border-[#e4e3dc] bg-white px-3">
            <span className="mr-2 text-xs text-[#8c8b82]">$</span>
            <input type="number" min="1" {...register('monthlyInstallment', { valueAsNumber: true })} className="h-full min-w-0 flex-1 text-xs outline-none" />
          </div>
        </FormField>
        <FormField label="Down payment" required error={errors.downPaymentPercent?.message}>
          <div className="flex h-10 items-center rounded-lg border border-[#e4e3dc] bg-white px-3">
            <input type="number" min="0" max="100" {...register('downPaymentPercent', { valueAsNumber: true })} className="h-full min-w-0 flex-1 text-xs outline-none" />
            <span className="ml-2 text-xs text-[#8c8b82]">%</span>
          </div>
        </FormField>
        <FormField label="Loan tenure" required error={errors.loanTenure?.message}>
          <select {...register('loanTenure', { valueAsNumber: true })} className={inputClass}>
            {LOAN_TENURES.map((years) => <option value={years} key={years}>{years} years</option>)}
          </select>
        </FormField>
        <FormField label="Interest rate" required error={errors.interestRate?.message}>
          <div className="flex h-10 items-center rounded-lg border border-[#e4e3dc] bg-white px-3">
            <input type="number" min="0" step="0.1" {...register('interestRate', { valueAsNumber: true })} className="h-full min-w-0 flex-1 text-xs outline-none" />
            <span className="ml-2 text-xs text-[#8c8b82]">%</span>
          </div>
        </FormField>
        <FormField label="Fixed period" required error={errors.fixedPeriodYears?.message}>
          <div className="flex h-10 items-center rounded-lg border border-[#e4e3dc] bg-white px-3">
            <input type="number" min="1" {...register('fixedPeriodYears', { valueAsNumber: true })} className="h-full min-w-0 flex-1 text-xs outline-none" />
            <span className="ml-2 text-xs text-[#8c8b82]">years</span>
          </div>
        </FormField>
      </div>
      <FormField label="Payment method" required error={errors.paymentMethods?.message}>
        <Controller control={control} name="paymentMethods" render={({ field }) => <MultiSelectChips options={[...PAYMENT_METHODS]} value={field.value} onChange={field.onChange} />} />
      </FormField>
      <FormField label="Additional fee">
        <Controller control={control} name="additionalFees" render={({ field }) => <MultiSelectChips options={[...ADDITIONAL_FEES]} value={field.value} onChange={field.onChange} />} />
      </FormField>
      <FormField label="Special offers">
        <Controller control={control} name="specialOffers" render={({ field }) => <MultiSelectChips options={[...SPECIAL_OFFERS]} value={field.value} onChange={field.onChange} />} />
      </FormField>
    </form>
  );
}
