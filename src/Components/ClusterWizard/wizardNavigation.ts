import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWizard } from './WizardContext';

export function getWizardPath(mode: 'create' | 'edit', clusterId: string | undefined, step: number, substep: string): string {
  const base = mode === 'edit' && clusterId
    ? `/properties/${encodeURIComponent(clusterId)}/edit`
    : '/properties/new';
  return `${base}/${step}/${substep}`;
}

export function useWizardNavigation() {
  const navigate = useNavigate();
  const { mode, clusterId, dispatch } = useWizard();

  const goTo = useCallback((step: number, substep: string, replace = false) => {
    dispatch({ type: 'SET_ROUTE', step, substep });
    navigate(getWizardPath(mode, clusterId, step, substep), { replace });
  }, [clusterId, dispatch, mode, navigate]);

  return { goTo };
}
