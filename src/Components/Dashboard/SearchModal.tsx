import { useEffect, useState, type KeyboardEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowDown, ArrowUp, Bath, BedDouble, ChevronRight, Search, X } from 'lucide-react';
import StoredImage from '../StoredImage';
import { useSearch } from '../../hooks/useSearch';
import type { SearchCategory } from '../../types/serenia';

type Props = {
  open: boolean;
  onClose: () => void;
};

const categories: { id: SearchCategory; label: string }[] = [
  { id: 'all', label: 'All (blogs, property, etc)' },
  { id: 'property', label: 'Property only' },
  { id: 'request', label: 'Request only' },
  { id: 'blog', label: 'Blogs only' },
];

function formatDate(value: string): string {
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' }).format(date);
}

export default function SearchModal({ open, onClose }: Props): React.JSX.Element | null {
  const navigate = useNavigate();
  const [category, setCategory] = useState<SearchCategory>('all');
  const [query, setQuery] = useState('');
  const [activeResult, setActiveResult] = useState(0);
  const results = useSearch(query, category, open);
  const properties = results.data?.properties ?? [];
  const requests = results.data?.requests ?? [];
  const visibleProperties = properties.slice(0, 5);
  const visibleRequests = requests.slice(0, 5);
  const resultDestinations = [
    ...visibleProperties.map(({ cluster }) => `/dashboard/properties?cluster=${cluster.id}`),
    ...visibleRequests.map(() => '/dashboard/requests'),
  ];

  useEffect(() => {
    if (open) return;
    setQuery('');
    setCategory('all');
    setActiveResult(0);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, open]);

  useEffect(() => {
    setActiveResult((current) => Math.min(current, Math.max(0, resultDestinations.length - 1)));
  }, [resultDestinations.length]);

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown' && resultDestinations.length > 0) {
      event.preventDefault();
      setActiveResult((current) => (current + 1) % resultDestinations.length);
    } else if (event.key === 'ArrowUp' && resultDestinations.length > 0) {
      event.preventDefault();
      setActiveResult((current) => (current - 1 + resultDestinations.length) % resultDestinations.length);
    } else if (event.key === 'Enter' && resultDestinations[activeResult]) {
      event.preventDefault();
      navigate(resultDestinations[activeResult]);
      onClose();
    }
  };

  if (!open) return null;

  const closeAndNavigate = (href: string) => {
    onClose();
    navigate(href);
  };
  let resultIndex = 0;
  const hasResults = visibleProperties.length > 0 || visibleRequests.length > 0;

  return (
    <div className="fixed inset-0 z-70 flex items-start justify-center bg-[#25251f]/35 px-3 py-[5vh] backdrop-blur-[5px] sm:px-6">
      <button type="button" aria-label="Close search" onClick={onClose} className="absolute inset-0 cursor-default" />
      <section role="dialog" aria-modal="true" aria-labelledby="dashboard-search-title" className="relative z-10 grid max-h-[90vh] w-full max-w-225 overflow-hidden rounded-2xl border border-[#e8e7df] bg-white shadow-2xl md:grid-cols-[220px_minmax(0,1fr)]">
        <div className="border-b border-[#eeede7] bg-[#fbfbf8] p-4 md:border-b-0 md:border-r md:p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 id="dashboard-search-title" className="text-xs font-semibold text-[#37372f]">Search categories</h2>
            <button type="button" aria-label="Close search" onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-lg text-[#77766e] hover:bg-[#f0efe9] md:hidden">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex gap-1 overflow-x-auto md:flex-col">
            {categories.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setCategory(item.id);
                  setActiveResult(0);
                }}
                className={`shrink-0 rounded-lg px-2.5 py-2 text-left text-[11px] transition-colors md:w-full ${
                  category === item.id ? 'bg-[#eeede2] font-medium text-[#706d22]' : 'text-[#717168] hover:bg-[#f1f0eb]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex min-h-0 flex-col">
          <div className="flex items-center gap-2 border-b border-[#eeede7] px-4 py-3.5 sm:px-5">
            <Search className="h-4 w-4 shrink-0 text-[#8a897f]" />
            <input
              autoFocus
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveResult(0);
              }}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search properties, requests, blogs..."
              className="min-w-0 flex-1 bg-transparent text-xs text-[#292920] outline-none placeholder:text-[#a3a299]"
            />
            <button type="button" aria-label="Close search" onClick={onClose} className="hidden h-7 w-7 items-center justify-center rounded-lg text-[#77766e] hover:bg-[#f4f3ef] md:flex">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-4 sm:p-5">
            {results.error && (
              <div role="alert" className="rounded-lg border border-[#f1d0ca] bg-[#fff8f6] p-3 text-xs text-[#a94137]">
                <p>{results.error.message}</p>
                <button type="button" onClick={() => { void results.retry(); }} className="mt-2 font-semibold underline">Retry search</button>
              </div>
            )}
            {results.loading && <p role="status" className="text-center text-[11px] text-[#85847b]">Searching…</p>}

            {visibleProperties.length > 0 && (
              <section>
                <h3 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#a09f95]">Properties</h3>
                <div className="space-y-2">
                  {visibleProperties.map(({ propertyType, cluster }) => {
                    const index = resultIndex++;
                    const href = `/dashboard/properties?cluster=${cluster.id}`;
                    return (
                      <Link
                        key={propertyType.id}
                        to={href}
                        onClick={onClose}
                        className={`flex gap-3 rounded-xl border p-2 transition-colors ${
                          activeResult === index ? 'border-[#c9c59e] bg-[#fbfaf5]' : 'border-[#eeede7] hover:bg-[#fafaf7]'
                        }`}
                      >
                        <StoredImage media={propertyType.cover ?? cluster.media.cover} alt="" className="h-17 w-22 shrink-0 rounded-lg" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-semibold text-[#34342c]">{propertyType.name}</p>
                          <p className="mt-0.5 truncate text-[10px] text-[#85847b]">{propertyType.description || cluster.name}</p>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            <span className="inline-flex items-center gap-1 rounded bg-[#f3f2ec] px-1.5 py-1 text-[9px] text-[#68675e]">
                              {new Intl.NumberFormat('en-US').format(propertyType.unitSize.value)} {propertyType.unitSize.unit}
                            </span>
                            <span className="inline-flex items-center gap-1 rounded bg-[#f3f2ec] px-1.5 py-1 text-[9px] text-[#68675e]"><BedDouble className="h-3 w-3" />{propertyType.bedrooms} beds</span>
                            <span className="inline-flex items-center gap-1 rounded bg-[#f3f2ec] px-1.5 py-1 text-[9px] text-[#68675e]"><Bath className="h-3 w-3" />{propertyType.bathrooms} bath</span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                {properties.length > visibleProperties.length && category === 'all' && (
                  <Link to="/dashboard/properties" onClick={onClose} className="mt-2 inline-flex items-center gap-1 text-[10px] font-medium text-[#77741f] hover:underline">
                    View {properties.length - visibleProperties.length} other properties <ChevronRight className="h-3 w-3" />
                  </Link>
                )}
              </section>
            )}

            {visibleRequests.length > 0 && (
              <section>
                <h3 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#a09f95]">Requests</h3>
                <div className="space-y-1.5">
                  {visibleRequests.map(({ request, cluster }) => {
                    const index = resultIndex++;
                    return (
                      <button
                        key={request.id}
                        type="button"
                        onClick={() => closeAndNavigate('/dashboard/requests')}
                        className={`flex w-full items-center gap-3 rounded-xl border p-2 text-left transition-colors ${
                          activeResult === index ? 'border-[#c9c59e] bg-[#fbfaf5]' : 'border-[#eeede7] hover:bg-[#fafaf7]'
                        }`}
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eee8d2] text-[10px] font-semibold text-[#77741f]">
                          {request.name.split(/\s+/).map((part) => part[0] ?? '').join('').slice(0, 2).toUpperCase()}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-xs font-semibold text-[#34342c]">{request.name}</span>
                          <span className="mt-0.5 block truncate text-[10px] text-[#85847b]">{cluster.name} · Unit {request.unit}</span>
                          <span className="mt-1 block text-[9px] text-[#8e8d84]">{formatDate(request.tourDate)} · {request.tourTime}</span>
                        </span>
                        <ChevronRight className="h-3.5 w-3.5 text-[#a3a299]" />
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            {!results.error && !results.loading && !hasResults && (
              <p className="py-8 text-center text-xs text-[#85847b]">No results found. Try a different search.</p>
            )}
          </div>

          <footer className="flex items-center justify-between border-t border-[#eeede7] px-4 py-2.5 text-[9px] text-[#929188] sm:px-5">
            <span className="flex items-center gap-1"><kbd className="rounded border border-[#e7e6df] px-1 py-0.5">Esc</kbd> Close</span>
            <span className="flex items-center gap-1"><ArrowUp className="h-3 w-3" /><ArrowDown className="h-3 w-3" /> Navigate</span>
          </footer>
        </div>
      </section>
    </div>
  );
}
