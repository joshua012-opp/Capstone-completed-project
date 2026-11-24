import { useEffect, useState } from 'react';
import type { SearchCategory, SearchResults } from '../types/serenia';
import { search } from '../services/searchService';
import { useAsyncData } from './useAsyncData';

const EMPTY_RESULTS: SearchResults = { properties: [], requests: [] };

export function useSearch(query: string, category: SearchCategory, enabled: boolean) {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    if (!enabled) return undefined;
    const timeout = window.setTimeout(() => setDebouncedQuery(query), 300);
    return () => window.clearTimeout(timeout);
  }, [enabled, query]);

  const dependencyKey = enabled ? `${category}|${debouncedQuery}` : 'disabled';
  const resource = useAsyncData(
    () => enabled ? search(debouncedQuery, category) : Promise.resolve(EMPTY_RESULTS),
    ['clusters', 'types', 'requests'],
    dependencyKey,
  );

  return {
    ...resource,
    loading: resource.loading || (enabled && debouncedQuery !== query),
  };
}
