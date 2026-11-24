import { createContext, useContext, useEffect, useMemo, useReducer, useRef, type Dispatch, type ReactNode } from 'react';
import type { WizardAction, WizardMode, WizardState } from '../../types/clusterWizard';
import { createInitialWizardState } from './wizardData';

type WizardContextValue = {
  mode: WizardMode;
  clusterId?: string;
  state: WizardState;
  dispatch: Dispatch<WizardAction>;
};

const WizardContext = createContext<WizardContextValue | null>(null);

function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'SET_ROUTE':
      return { ...state, currentStep: action.step, currentSubstep: action.substep };
    case 'SET_DATA':
      return { ...state, data: { ...state.data, ...action.data }, dirty: true };
    case 'SET_VALID':
      return { ...state, validSubsteps: { ...state.validSubsteps, [action.key]: action.valid } };
    case 'SET_DIRTY':
      return { ...state, dirty: action.dirty };
    case 'SET_PUBLISH_DIALOG':
      return { ...state, publishDialogOpen: action.open };
    case 'ADD_PROPERTY_TYPE': {
      const next = state.data.propertyTypes.some((item) => item.id === action.propertyType.id)
        ? state.data.propertyTypes.map((item) => item.id === action.propertyType.id ? action.propertyType : item)
        : [...state.data.propertyTypes, action.propertyType];
      return {
        ...state,
        data: { ...state.data, propertyTypes: next, propertyDraft: null },
        dirty: true,
      };
    }
    case 'DELETE_PROPERTY_TYPE':
      return {
        ...state,
        data: { ...state.data, propertyTypes: state.data.propertyTypes.filter((item) => item.id !== action.id) },
        dirty: true,
      };
    case 'SET_PROPERTY_DRAFT':
      return { ...state, data: { ...state.data, propertyDraft: action.propertyDraft }, dirty: true };
    default:
      return state;
  }
}

type Props = {
  mode: WizardMode;
  clusterId?: string;
  children: ReactNode;
};

export function WizardProvider({ mode, clusterId, children }: Props): React.JSX.Element {
  const [state, dispatch] = useReducer(wizardReducer, mode, createInitialWizardState);
  const value = useMemo(() => ({ mode, clusterId, state, dispatch }), [mode, clusterId, state]);
  const dataRef = useRef(state.data);

  useEffect(() => {
    dataRef.current = state.data;
  }, [state.data]);
  useEffect(() => () => {
    const assets: string[] = [];
    const collect = (asset: { preview: string; file: File | null } | null) => {
      if (asset?.file && asset.preview.startsWith('blob:')) assets.push(asset.preview);
    };
    const data = dataRef.current;
    collect(data.cover);
    data.brochures.forEach(collect);
    Object.values(data.gallery).flat().forEach(collect);
    data.amenities.forEach((amenity) => collect(amenity.image));
    data.propertyTypes.forEach((property) => {
      collect(property.cover);
      Object.values(property.gallery).flat().forEach(collect);
      property.floorPlans.forEach((floor) => collect(floor.image));
    });
    if (data.propertyDraft) {
      collect(data.propertyDraft.cover);
      Object.values(data.propertyDraft.gallery).flat().forEach(collect);
      data.propertyDraft.floorPlans.forEach((floor) => collect(floor.image));
    }
    assets.forEach((preview) => URL.revokeObjectURL(preview));
  }, []);

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
}

export function useWizard(): WizardContextValue {
  const context = useContext(WizardContext);
  if (!context) throw new Error('Cluster wizard components must be used inside WizardProvider.');
  return context;
}
