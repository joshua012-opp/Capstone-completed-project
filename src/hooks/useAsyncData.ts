import { useCallback, useEffect, useRef, useState } from 'react';
import { subscribeToDataEvents, type DataScope } from '../services/dataEvents';

export type AsyncData<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
  retry: () => Promise<void>;
};

export function useAsyncData<T>(
  loader: () => Promise<T>,
  scopes: readonly DataScope[],
  dependencyKey: string | number,
): AsyncData<T> {
  const [state, setState] = useState<Omit<AsyncData<T>, 'retry'>>({
    data: null,
    loading: true,
    error: null,
  });
  const loaderRef = useRef(loader);
  const requestId = useRef(0);
  loaderRef.current = loader;
  const scopeKey = scopes.join('|');

  const retry = useCallback(async () => {
    const currentRequest = ++requestId.current;
    setState((current) => ({ ...current, loading: true, error: null }));
    try {
      const data = await loaderRef.current();
      if (requestId.current === currentRequest) {
        setState({ data, loading: false, error: null });
      }
    } catch (error) {
      if (requestId.current === currentRequest) {
        setState((current) => ({
          ...current,
          loading: false,
          error: error instanceof Error ? error : new Error(String(error)),
        }));
      }
    }
  }, []);

  useEffect(() => {
    const subscribedScopes = scopeKey ? scopeKey.split('|') as DataScope[] : [];
    const unsubscribe = subscribeToDataEvents(subscribedScopes, () => { void retry(); });
    void retry();
    return () => {
      unsubscribe();
      requestId.current += 1;
    };
  }, [dependencyKey, retry, scopeKey]);

  return { ...state, retry };
}
