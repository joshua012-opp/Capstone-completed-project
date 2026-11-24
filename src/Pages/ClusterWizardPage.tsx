import { useCallback, useEffect, useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import ClusterWizardLayout from '../Components/ClusterWizard/ClusterWizardLayout';
import UnsavedChangesDialog from '../Components/ClusterWizard/UnsavedChangesDialog';
import WizardStepContent from '../Components/ClusterWizard/WizardStepContent';
import { useWizard, WizardProvider } from '../Components/ClusterWizard/WizardContext';
import {
  canAccessSubstep,
  getFirstIncompleteLocation,
  isStepComplete,
  REQUIRED_SUBSTEPS,
  WIZARD_STEPS,
  emptyPropertyType,
} from '../Components/ClusterWizard/wizardData';
import { getWizardPath, useWizardNavigation } from '../Components/ClusterWizard/wizardNavigation';
import type { ClusterSubmitMode, WizardMode } from '../types/clusterWizard';

type PageProps = { mode: WizardMode };

function isWizardPath(pathname: string): boolean {
  return pathname.startsWith('/properties/new/') || /^\/properties\/[^/]+\/edit(?:\/|$)/.test(pathname);
}

function WizardController({ mode }: PageProps): React.JSX.Element {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { state, dispatch, clusterId } = useWizard();
  const { goTo } = useWizardNavigation();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingPath, setPendingPath] = useState('');
  const dirtyRef = useRef(state.dirty);
  const allowLeaveRef = useRef(false);
  const lastWizardPath = useRef(location.pathname + location.search + location.hash);
  dirtyRef.current = state.dirty;

  const route = (() => {
    if (mode === 'create') {
      return { step: Number(params.step ?? 1), substep: params.sub ?? 'basic-information' };
    }
    const tail = params['*']?.split('/').filter(Boolean) ?? [];
    return {
      step: Number(params.step ?? tail[0] ?? 1),
      substep: params.sub ?? tail[1] ?? 'basic-information',
    };
  })();
  const editBaseWithoutStep = mode === 'edit' && !params.step && !params.sub && !params['*'];

  useEffect(() => {
    if (state.currentStep !== route.step || state.currentSubstep !== route.substep) {
      dispatch({ type: 'SET_ROUTE', step: route.step, substep: route.substep });
    }
  }, [dispatch, route.step, route.substep, state.currentStep, state.currentSubstep]);

  useEffect(() => {
    if (isWizardPath(location.pathname)) {
      lastWizardPath.current = location.pathname + location.search + location.hash;
    }
  }, [location.hash, location.pathname, location.search]);

  useEffect(() => {
    if (!state.dirty) return undefined;
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [state.dirty]);

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      if (!dirtyRef.current || allowLeaveRef.current || !(event.target instanceof Element)) return;
      const link = event.target.closest('a[href]');
      if (!(link instanceof HTMLAnchorElement)) return;
      const target = new URL(link.href, window.location.href);
      if (target.origin === window.location.origin && isWizardPath(target.pathname)) return;
      event.preventDefault();
      event.stopPropagation();
      setPendingPath(target.href);
      setConfirmOpen(true);
    };
    const onPopState = () => {
      if (!dirtyRef.current || allowLeaveRef.current) return;
      const target = window.location.pathname + window.location.search + window.location.hash;
      if (isWizardPath(target)) return;
      setPendingPath(target);
      navigate(lastWizardPath.current, { replace: true });
      setConfirmOpen(true);
    };
    document.addEventListener('click', onDocumentClick, true);
    window.addEventListener('popstate', onPopState);
    return () => {
      document.removeEventListener('click', onDocumentClick, true);
      window.removeEventListener('popstate', onPopState);
    };
  }, [navigate]);

  const goBack = useCallback(() => {
    if (route.step === 1 && route.substep === 'basic-information') return;
    if (route.step === 1) return goTo(1, 'basic-information');
    if (mode === 'edit' && route.step === 4 && route.substep === 'type-details') return goTo(4, 'types-list');
    const metaIndex = WIZARD_STEPS.findIndex((step) => step.step === route.step);
    const stepMeta = WIZARD_STEPS[metaIndex];
    const subIndex = stepMeta?.substeps.findIndex((substep) => substep.id === route.substep) ?? -1;
    if (route.step === 4 && route.substep === 'types-list') return goTo(4, 'types');
    if (subIndex > 0) return goTo(route.step, stepMeta.substeps[subIndex - 1].id);
    const previousStep = WIZARD_STEPS[metaIndex - 1];
    const previousSubstep = previousStep?.substeps[previousStep.substeps.length - 1];
    if (previousStep && previousSubstep) goTo(previousStep.step, previousSubstep.id);
  }, [goTo, mode, route.step, route.substep]);

  const canOpenStep = useCallback((targetStep: number) => {
    if (targetStep === route.step) return true;
    if (targetStep < route.step) return isStepComplete(state, targetStep);
    return REQUIRED_SUBSTEPS
      .filter((key) => Number(key.split(':')[0]) < targetStep)
      .every((key) => state.validSubsteps[key]);
  }, [route.step, state]);

  const openStep = (targetStep: number) => {
    if (!canOpenStep(targetStep)) return;
    const firstSubstep = WIZARD_STEPS.find((item) => item.step === targetStep)?.substeps[0];
    if (firstSubstep) goTo(targetStep, firstSubstep.id);
  };

  const addPropertyType = () => {
    dispatch({ type: 'SET_PROPERTY_DRAFT', propertyDraft: emptyPropertyType() });
    goTo(4, 'type-details');
  };
  const openPublish = () => dispatch({ type: 'SET_PUBLISH_DIALOG', open: true });

  const complete = (submitMode: ClusterSubmitMode) => {
    if (submitMode === 'publish' && !REQUIRED_SUBSTEPS.every((key) => state.validSubsteps[key])) return;
    if ((submitMode === 'draft' || submitMode === 'edit') && !state.data.details.name.trim()) return;
    console.log('Cluster wizard submission', { mode: submitMode, data: state.data });
    allowLeaveRef.current = true;
    dispatch({ type: 'SET_DIRTY', dirty: false });
    dispatch({ type: 'SET_PUBLISH_DIALOG', open: false });
    const message = submitMode === 'edit'
      ? 'Cluster changes saved.'
      : submitMode === 'draft' ? 'Cluster saved as a draft.' : 'Cluster published successfully.';
    navigate('/properties', { state: { clusterWizardToast: message } });
  };

  const stayInWizard = () => {
    setConfirmOpen(false);
    setPendingPath('');
  };

  const leaveWizard = () => {
    const target = pendingPath;
    allowLeaveRef.current = true;
    dispatch({ type: 'SET_DIRTY', dirty: false });
    setConfirmOpen(false);
    setPendingPath('');
    if (/^https?:\/\//i.test(target)) {
      window.location.assign(target);
    } else {
      navigate(target || '/properties');
    }
  };

  const firstIncomplete = getFirstIncompleteLocation(state);
  const accessible = canAccessSubstep(state, route.step, route.substep);
  const knownStep = WIZARD_STEPS.some((step) => step.step === route.step);
  const knownSubstep = WIZARD_STEPS.find((step) => step.step === route.step)?.substeps.some((substep) => substep.id === route.substep);

  if (editBaseWithoutStep) {
    return <Navigate to={getWizardPath(mode, clusterId, 1, 'basic-information')} replace />;
  }
  if (mode === 'edit' && route.step === 4 && route.substep === 'types') {
    return <Navigate to={getWizardPath(mode, clusterId, 4, 'types-list')} replace />;
  }
  if (!knownStep || !knownSubstep || !accessible) {
    return <Navigate to={getWizardPath(mode, clusterId, firstIncomplete.step, firstIncomplete.substep)} replace />;
  }

  return (
    <>
      <ClusterWizardLayout
        mode={mode}
        step={route.step}
        substep={route.substep}
        canOpenStep={canOpenStep}
        onBack={goBack}
        onStepClick={openStep}
        onAddPropertyType={addPropertyType}
        onOpenPublish={openPublish}
        onSubmit={complete}
      >
        <WizardStepContent step={route.step} substep={route.substep} />
      </ClusterWizardLayout>
      <UnsavedChangesDialog open={confirmOpen} onStay={stayInWizard} onLeave={leaveWizard} />
    </>
  );
}

export default function ClusterWizardPage({ mode }: PageProps): React.JSX.Element {
  const params = useParams();
  const clusterId = mode === 'edit' ? params.clusterId : undefined;
  return (
    <WizardProvider key={`${mode}:${clusterId ?? ''}`} mode={mode} clusterId={clusterId}>
      <WizardController mode={mode} />
    </WizardProvider>
  );
}
