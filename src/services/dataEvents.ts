export type DataScope = 'clusters' | 'types' | 'requests' | 'analytics' | 'settings';
export type DataEventListener = (scope: DataScope) => void;

const scopes: DataScope[] = ['clusters', 'types', 'requests', 'analytics', 'settings'];
const listeners = new Map<DataScope, Set<DataEventListener>>(
  scopes.map((scope) => [scope, new Set<DataEventListener>()]),
);

function scopesForStorageKey(key: string | null): DataScope[] {
  if (key === null || key === 'serenia_schema_version') return scopes;
  if (key === 'serenia_clusters' || key === 'serenia_cluster_history' || key === 'serenia_wizard_autosave') return ['clusters'];
  if (key === 'serenia_property_types') return ['types'];
  if (key === 'serenia_requests') return ['requests'];
  if (key === 'serenia_analytics') return ['analytics'];
  if (key === 'serenia_settings' || key === 'serenia_session') return ['settings'];
  return [];
}

export function emitDataEvent(scope: DataScope): void {
  listeners.get(scope)?.forEach((listener) => listener(scope));
}

export function subscribeToDataEvents(
  subscribedScopes: readonly DataScope[],
  listener: DataEventListener,
): () => void {
  const uniqueScopes = [...new Set(subscribedScopes)];
  uniqueScopes.forEach((scope) => listeners.get(scope)?.add(listener));

  const onStorage = (event: StorageEvent) => {
    scopesForStorageKey(event.key).forEach((scope) => {
      if (uniqueScopes.includes(scope)) listener(scope);
    });
  };
  window.addEventListener('storage', onStorage);

  return () => {
    uniqueScopes.forEach((scope) => listeners.get(scope)?.delete(listener));
    window.removeEventListener('storage', onStorage);
  };
}
