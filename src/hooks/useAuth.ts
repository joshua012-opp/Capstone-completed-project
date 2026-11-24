import { useCallback } from 'react';
import type { CurrentUser } from '../types/serenia';
import { getCurrentUser, login, logout } from '../services/authService';
import { useAsyncData } from './useAsyncData';

export function useAuth() {
  const resource = useAsyncData(getCurrentUser, ['settings'], 'current-user');

  const signIn = useCallback((email: string, password: string): Promise<CurrentUser> => (
    login(email, password)
  ), []);

  const signOut = useCallback(async (): Promise<void> => {
    await logout();
  }, []);

  return {
    ...resource,
    user: resource.data,
    signIn,
    signOut,
  };
}
