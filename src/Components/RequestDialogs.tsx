import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { all as getAllCountries } from 'country-codes-list';
import { useProperties } from '../hooks/useProperties';
import { addInquiry, addRequest } from '../services/requestService';
import type { ClusterWithSummary } from '../types/serenia';

type DialogType = 'tour' | 'brochure';
type RequestDialogsContextValue = {
  openTourRequest: () => void;
  openBrochureRequest: () => void;
};

const RequestDialogsContext = createContext<RequestDialogsContextValue | null>(null);
const countryCallingCodes = getAllCountries()
  .filter((country) => country.countryCallingCode.length > 0)
  .sort((a, b) => {
    if (a.countryCode === 'US') return -1;
    if (b.countryCode === 'US') return 1;
    return a.countryNameEn.localeCompare(b.countryNameEn);
  });

export function useRequestDialogs(): RequestDialogsContextValue {
  const context = useContext(RequestDialogsContext);
  if (!context) {
    throw new Error('Request dialogs must be used within RequestDialogsProvider.');
  }
  return context;
}

export function RequestDialogsProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [dialog, setDialog] = useState<DialogType | null>(null);
  const clusters = useProperties({ sort: 'name', status: 'opened' });
  const openTourRequest = useCallback(() => setDialog('tour'), []);
  const openBrochureRequest = useCallback(() => setDialog('brochure'), []);
  const closeDialog = useCallback(() => setDialog(null), []);
  const contextValue = useMemo(
    () => ({ openTourRequest, openBrochureRequest }),
    [openTourRequest, openBrochureRequest],
  );

  return (
    <RequestDialogsContext.Provider value={contextValue}>
      {children}
      {dialog && (
        <RequestDialog
          type={dialog}
          onClose={closeDialog}
          clusters={clusters.data ?? []}
          clustersLoading={clusters.loading}
          clustersError={clusters.error?.message ?? ''}
          onRetryClusters={() => { void clusters.retry(); }}
        />
      )}
    </RequestDialogsContext.Provider>
  );
}

type RequestDialogProps = {
  type: DialogType;
  onClose: () => void;
  clusters: ClusterWithSummary[];
  clustersLoading: boolean;
  clustersError: string;
  onRetryClusters: () => void;
};

function RequestDialog({ type, onClose, ...clusterProps }: RequestDialogProps): React.JSX.Element {
  const title = type === 'tour' ? 'Request tour' : 'Brochure request';

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/35 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="request-dialog-title"
        className={`w-full overflow-y-auto border border-gray-200 bg-white shadow-2xl ${type === 'tour' ? 'max-h-[calc(100vh-32px)] max-w-187.5' : 'max-h-[calc(100vh-32px)] max-w-120'}`}
      >
        <div className={`flex items-center justify-between border-b border-gray-200 px-5 sm:px-6 ${type === 'tour' ? 'h-13.25' : 'h-16'}`}>
          <h2 id="request-dialog-title" className={`${type === 'tour' ? 'text-xs' : 'text-sm'} font-medium`}>{title}</h2>
          <button
            type="button"
            aria-label={`Close ${title}`}
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center text-xl leading-none text-gray-500 hover:text-black"
          >
            ×
          </button>
        </div>
        {type === 'tour'
          ? <TourRequestForm {...clusterProps} />
          : <BrochureRequestForm {...clusterProps} />}
      </div>
    </div>
  );
}

function formBody(formData: FormData): string {
  return Array.from(formData.entries())
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n');
}

function TextField({
  id,
  name,
  label,
  placeholder,
  type = 'text',
  required = true,
  height = 'h-10',
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  height?: string;
}): React.JSX.Element {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium">{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className={`${height} w-full border border-gray-300 px-3 text-xs outline-none focus:border-[#56593B]`}
      />
    </div>
  );
}

function PhoneField({ height = 'h-10' }: { height?: string }): React.JSX.Element {
  return (
    <div>
      <label htmlFor="request-phone" className="mb-1.5 block text-xs font-medium">Phone number</label>
      <div className={`flex ${height}`}>
        <select
          name="countryCode"
          aria-label="Country calling code"
          defaultValue="+1"
          className="w-23.5 shrink-0 border border-gray-300 bg-white px-2 text-xs outline-none focus:border-[#56593B]"
        >
          {countryCallingCodes.map((country) => (
            <option key={country.countryCode} value={`+${country.countryCallingCode}`} title={country.countryNameEn}>
              {country.flag} +{country.countryCallingCode}
            </option>
          ))}
        </select>
        <input
          id="request-phone"
          name="phone"
          type="tel"
          autoComplete="tel-national"
          placeholder="Enter your number"
          required
          className="min-w-0 flex-1 border border-l-0 border-gray-300 px-3 text-xs outline-none focus:border-[#56593B]"
        />
      </div>
    </div>
  );
}

type ClusterSelectProps = {
  height?: string;
  clusters: ClusterWithSummary[];
  clustersLoading: boolean;
  clustersError: string;
  onRetryClusters: () => void;
};

function ClusterSelect({ height = 'h-10', clusters, clustersLoading, clustersError, onRetryClusters }: ClusterSelectProps): React.JSX.Element {
  return (
    <div>
      <label htmlFor="request-cluster" className="mb-1.5 block text-xs font-medium">Cluster</label>
      <select
        id="request-cluster"
        name="cluster"
        required
        defaultValue=""
        disabled={clustersLoading || clusters.length === 0}
        className={`${height} w-full border border-gray-300 bg-white px-3 text-xs text-gray-600 outline-none focus:border-[#56593B]`}
      >
        <option value="" disabled>Select cluster</option>
        {clusters.map((cluster) => <option key={cluster.id} value={cluster.id}>{cluster.name}</option>)}
      </select>
      {clustersLoading && <p role="status" className="mt-1 text-[10px] text-gray-500">Loading available clusters…</p>}
      {clustersError && (
        <p role="alert" className="mt-1 text-[10px] text-[#a94137]">
          {clustersError} <button type="button" onClick={onRetryClusters} className="font-semibold underline">Retry</button>
        </p>
      )}
    </div>
  );
}

function CalendarIcon(): React.JSX.Element {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4">
      <rect x="4" y="5" width="16" height="15" rx="1" />
      <path strokeLinecap="round" d="M8 3v4M16 3v4M4 9h16M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01" />
    </svg>
  );
}

function ClockIcon(): React.JSX.Element {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4">
      <circle cx="12" cy="12" r="8.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
    </svg>
  );
}

function CalendarPanel(): React.JSX.Element {
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow;
  });
  const [visibleMonth, setVisibleMonth] = useState(
    () => new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
  );

  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cellCount = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;
  const calendarDays = Array.from(
    { length: cellCount },
    (_, index) => new Date(year, month, index - firstWeekday + 1),
  );
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dateValue = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;

  return (
    <div className="space-y-3">
      <div className="bg-white shadow-[0_1px_5px_rgba(0,0,0,0.07)]">
        <div className="flex h-12 items-center justify-between border-b border-gray-200 px-4">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <CalendarIcon />
            <span>Select date</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-gray-500">
            <button
              type="button"
              aria-label="Previous month"
              disabled={year === today.getFullYear() && month === today.getMonth()}
              onClick={() => setVisibleMonth(new Date(year, month - 1, 1))}
              className="h-6 w-6 text-sm disabled:text-gray-300"
            >
              ‹
            </button>
            <span className="min-w-20 text-center">
              {visibleMonth.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </span>
            <button
              type="button"
              aria-label="Next month"
              onClick={() => setVisibleMonth(new Date(year, month + 1, 1))}
              className="h-6 w-6 text-sm"
            >
              ›
            </button>
          </div>
        </div>

        <div className="p-3 sm:p-4">
          <div className="mb-1 grid grid-cols-7 text-center text-[10px] text-gray-500">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => <span key={day} className="py-2">{day}</span>)}
          </div>
          <div className="grid grid-cols-7 gap-y-1 text-center text-[11px]">
            {calendarDays.map((day) => {
              const isSelected = day.toDateString() === selectedDate.toDateString();
              const isToday = day.toDateString() === today.toDateString();
              const isCurrentMonth = day.getMonth() === month;
              const isPast = day < today;

              return (
                <button
                  type="button"
                  key={day.toISOString()}
                  aria-label={day.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  aria-pressed={isSelected}
                  disabled={isPast}
                  onClick={() => setSelectedDate(day)}
                  className={`mx-auto flex h-9 w-9 items-center justify-center disabled:cursor-not-allowed ${isSelected ? 'bg-[#56593B] text-white' : isToday ? 'border border-[#56593B] text-[#56593B]' : isCurrentMonth ? 'text-[#141414] hover:bg-gray-100' : 'text-gray-400 hover:bg-gray-100'}`}
                >
                  {String(day.getDate()).padStart(2, '0')}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <input type="hidden" name="date" value={dateValue} />

      <div className="bg-white shadow-[0_1px_5px_rgba(0,0,0,0.07)]">
        <div className="flex h-12 items-center gap-2 border-b border-gray-200 px-4 text-xs text-gray-600">
          <ClockIcon />
          <span>Select time</span>
        </div>
        <div className="p-4">
          <label htmlFor="tour-time" className="mb-2 block text-xs font-medium">Preferred time</label>
          <select
            id="tour-time"
            name="time"
            required
            defaultValue=""
            className="h-10 w-full border border-gray-300 bg-white px-3 text-xs text-gray-600 outline-none focus:border-[#56593B]"
          >
            <option value="" disabled>Select time</option>
            {['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'].map((time) => (
              <option key={time}>{time}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

function TourRequestForm(props: ClusterSelectProps): React.JSX.Element {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    setSubmitted(false);
    const form = event.currentTarget;
    const formData = new FormData(form);
    try {
      await addRequest({
        name: String(formData.get('fullName') ?? '').trim(),
        email: String(formData.get('email') ?? '').trim(),
        phone: `${String(formData.get('countryCode') ?? '')} ${String(formData.get('phone') ?? '').trim()}`.trim(),
        clusterId: String(formData.get('cluster') ?? ''),
        unit: String(formData.get('unit') ?? ''),
        tourDate: String(formData.get('date') ?? ''),
        tourTime: String(formData.get('time') ?? ''),
      });
      setSubmitted(true);
      form.reset();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to save the tour request.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={(event) => { void handleSubmit(event); }}>
      <div className="grid md:min-h-124.5 md:grid-cols-2">
        <div className="bg-[#f8f8f8] p-4 sm:px-5 sm:py-4">
          <CalendarPanel />
        </div>

        <div className="space-y-3 bg-white p-4 sm:px-5 sm:py-4">
          <TextField id="tour-name" name="fullName" label="Full name" placeholder="Enter your name" height="h-9" />
          <TextField id="tour-email" name="email" label="Email address" placeholder="Enter your email" type="email" height="h-9" />
          <PhoneField height="h-9" />
          <ClusterSelect height="h-9" {...props} />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="tour-property-type" className="mb-1.5 block text-xs font-medium">Property type</label>
              <select
                id="tour-property-type"
                name="propertyType"
                required
                defaultValue=""
                className="h-9 w-full border border-gray-300 bg-white px-2 text-xs text-gray-600 outline-none focus:border-[#56593B]"
              >
                <option value="" disabled>Select type</option>
                <option>Type A</option>
                <option>Type B</option>
                <option>Type C</option>
              </select>
            </div>
            <div>
              <label htmlFor="tour-unit" className="mb-1.5 block text-xs font-medium">Unit</label>
              <select
                id="tour-unit"
                name="unit"
                required
                defaultValue=""
                className="h-9 w-full border border-gray-300 bg-white px-2 text-xs text-gray-600 outline-none focus:border-[#56593B]"
              >
                <option value="" disabled>Select unit</option>
                <option>Any available unit</option>
                <option>Not sure yet</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="tour-note" className="mb-1.5 block text-xs font-medium">Note</label>
            <textarea
              id="tour-note"
              name="note"
              placeholder="Enter message"
              className="h-22 w-full resize-y border border-gray-300 px-3 py-2 text-xs outline-none focus:border-[#56593B]"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3 border-t border-gray-200 px-5 py-4.25 sm:px-6">
        {error && <p role="alert" className="rounded-lg bg-[#fff1ef] px-3 py-2 text-xs text-[#b63d34]">{error}</p>}
        {submitted && <p role="status" className="rounded-lg bg-[#eef5ec] px-3 py-2 text-xs text-[#4d8558]">Your tour request was saved successfully.</p>}
        <div className="flex justify-end">
          <button type="submit" disabled={saving || props.clustersLoading || props.clusters.length === 0} className="h-9 bg-[#56593B] px-5 text-xs font-medium text-white hover:bg-[#474a31] disabled:cursor-wait disabled:opacity-60">
            {saving ? 'Submitting…' : 'Submit'}
          </button>
        </div>
      </div>
    </form>
  );
}

const brochureTypes = ['Full brochure', 'Floorplan Only', 'Pricing Sheet'];

function BrochureTypeIcon({ index }: { index: number }): React.JSX.Element {
  if (index === 0) {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 4.5h12v15H6zM9 8h6M9 11.5h6M9 15h4" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M3 19h4v-4h4v-4h4V7h6v4h-2v-2h-2v4h-4v4h-4v4H3z" />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4 10 8-6 8 6v10H4zM9 20v-6h6v6M9 10h.01M12 10h.01M15 10h.01" />
    </svg>
  );
}

function DeliveryMethodIcon({ method }: { method: 'Email' | 'Whatsapp' }): React.JSX.Element {
  return method === 'Email' ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4zM4.5 7l7.5 6 7.5-6" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 11.5a8 8 0 0 1-11.8 7l-4.2 1 1-4.1A8 8 0 1 1 20 11.5Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.5c.4 2.4 2.1 4.1 4.5 4.5l1-1 1.8.8c-.2 1.2-1 1.8-2.2 1.7-3.5-.4-6.2-3.1-6.6-6.6-.1-1.2.5-2 1.7-2.2L10 7.5z" />
    </svg>
  );
}

function BrochureRequestForm(props: ClusterSelectProps): React.JSX.Element {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['Full brochure', 'Floorplan Only']);
  const [sendVia, setSendVia] = useState<'Email' | 'Whatsapp'>('Email');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (selectedTypes.length === 0) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const popup = sendVia === 'Whatsapp' ? window.open('about:blank', '_blank') : null;
    setSaving(true);
    setError('');
    setSubmitted(false);
    try {
      await addInquiry({
        name: String(formData.get('fullName') ?? '').trim(),
        email: String(formData.get('email') ?? '').trim(),
        clusterId: String(formData.get('cluster') ?? ''),
        message: `Brochure request: ${selectedTypes.join(', ')}`,
      });
      const body = formBody(formData);
      if (sendVia === 'Whatsapp') {
        const url = `https://wa.me/13453345005?text=${encodeURIComponent(body)}`;
        if (popup) popup.location.assign(url);
        else setError('The request was saved, but your browser blocked the WhatsApp window.');
      } else {
        window.location.href = `mailto:sereniasupport@serenia.com?subject=${encodeURIComponent('Serenia brochure request')}&body=${encodeURIComponent(body)}`;
      }
      setSubmitted(true);
    } catch (submitError) {
      popup?.close();
      setError(submitError instanceof Error ? submitError.message : 'Unable to save the brochure request.');
    } finally {
      setSaving(false);
    }
  };

  const toggleType = (type: string) => {
    setSelectedTypes((current) => current.includes(type)
      ? current.filter((selectedType) => selectedType !== type)
      : [...current, type]);
  };

  return (
    <form onSubmit={(event) => { void handleSubmit(event); }}>
      <div className="space-y-5 px-5 py-6 sm:px-6 sm:py-7">
        <TextField id="brochure-name" name="fullName" label="Full name" placeholder="Enter your name" height="h-12" />
        <TextField id="brochure-email" name="email" label="Email address" placeholder="Enter your email" type="email" height="h-12" />
        <PhoneField height="h-12" />
        <ClusterSelect height="h-12" {...props} />

        <fieldset>
          <legend className="mb-2 block text-xs font-medium">Brochure type</legend>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {brochureTypes.map((type, index) => {
              const isSelected = selectedTypes.includes(type);
              return (
                <button
                  type="button"
                  key={type}
                  aria-pressed={isSelected}
                  onClick={() => toggleType(type)}
                  className={`flex h-21.5 flex-col items-center justify-center gap-2 border px-1 text-center text-xs transition-colors ${isSelected ? 'border-[#b8b99a] bg-[#f7f7f1] text-[#56593B]' : 'border-gray-300 bg-white text-[#141414] hover:bg-gray-50'}`}
                >
                  <BrochureTypeIcon index={index} />
                  {type}
                </button>
              );
            })}
          </div>
          {selectedTypes.map((type) => <input key={type} type="hidden" name="brochureType" value={type} />)}
        </fieldset>

        <fieldset>
          <legend className="mb-2 block text-xs font-medium">Send via</legend>
          <div className="grid grid-cols-2 gap-3">
            {(['Email', 'Whatsapp'] as const).map((method) => {
              const isSelected = sendVia === method;
              return (
                <button
                  type="button"
                  key={method}
                  aria-pressed={isSelected}
                  onClick={() => setSendVia(method)}
                  className={`flex h-21.5 flex-col items-center justify-center gap-2 border text-xs transition-colors ${isSelected ? 'border-[#b8b99a] bg-[#f7f7f1] text-[#56593B]' : 'border-gray-300 bg-white text-[#141414] hover:bg-gray-50'}`}
                >
                  <DeliveryMethodIcon method={method} />
                  {method}
                </button>
              );
            })}
          </div>
          <input type="hidden" name="sendVia" value={sendVia} />
        </fieldset>
      </div>

      <div className="border-t border-gray-200 px-5 py-6 sm:px-6">
        {error && <p role="alert" className="mb-3 rounded-lg bg-[#fff1ef] px-3 py-2 text-xs text-[#b63d34]">{error}</p>}
        {submitted && <p role="status" className="mb-3 rounded-lg bg-[#eef5ec] px-3 py-2 text-xs text-[#4d8558]">Your brochure request was saved.</p>}
        <button
          type="submit"
          disabled={selectedTypes.length === 0 || saving || props.clustersLoading || props.clusters.length === 0}
          className="w-full bg-[#56593B] py-3.5 text-sm font-medium text-white hover:bg-[#474a31] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? 'Submitting…' : 'Submit request'}
        </button>
      </div>
    </form>
  );
}
