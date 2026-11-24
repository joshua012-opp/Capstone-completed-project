import type { ReactNode } from 'react';
import type { AsyncData } from '../../hooks/useAsyncData';

type Props<T> = {
  resource: AsyncData<T>;
  sectionName: string;
  skeleton: 'stats' | 'chart' | 'units' | 'requests' | 'summary';
  children: (data: T) => ReactNode;
};

function Skeleton({ type }: { type: Props<unknown>['skeleton'] }): React.JSX.Element {
  if (type === 'stats') {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Loading statistics">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="h-[112px] animate-pulse rounded-xl border border-[#ecebe4] bg-white p-5">
            <div className="h-3 w-24 rounded bg-[#eeede7]" />
            <div className="mt-5 h-7 w-16 rounded bg-[#eeede7]" />
            <div className="mt-3 h-2 w-28 rounded bg-[#f3f2ed]" />
          </div>
        ))}
      </div>
    );
  }

  const height = type === 'chart' ? 'h-[300px]' : type === 'requests' ? 'h-[260px]' : 'h-[230px]';
  return (
    <div aria-label={`Loading ${type}`} className={`${height} animate-pulse rounded-xl border border-[#ecebe4] bg-white p-5`}>
      <div className="h-4 w-36 rounded bg-[#eeede7]" />
      <div className="mt-5 h-3/4 rounded-lg bg-[#f6f5f0]" />
      {type === 'units' && <div className="mt-3 h-2 w-full rounded bg-[#eeede7]" />}
    </div>
  );
}

export default function DashboardResource<T>({ resource, sectionName, skeleton, children }: Props<T>): React.JSX.Element {
  if (resource.error) {
    return (
      <div role="alert" className="flex min-h-32 flex-col items-start justify-center gap-2 rounded-xl border border-[#e9e7dc] bg-white px-5 py-4">
        <p className="text-xs font-semibold text-[#4c4a3e]">Could not load {sectionName}.</p>
        <p className="text-[11px] text-[#77756b]">{resource.error.message}</p>
        <button type="button" onClick={() => { void resource.retry(); }} className="mt-1 rounded-lg bg-[#56593B] px-3 py-2 text-[11px] font-medium text-white hover:bg-[#474a31]">
          Retry
        </button>
      </div>
    );
  }

  if (resource.data === null) {
    return <Skeleton type={skeleton} />;
  }

  return <>{children(resource.data)}</>;
}
