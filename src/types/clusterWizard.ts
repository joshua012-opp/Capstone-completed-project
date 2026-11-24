export type WizardMode = 'create' | 'edit';
export type UnitSizeUnit = 'm²' | 'ft²';

export type WizardAsset = {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File | null;
  preview: string;
  progress: number;
};

export type MapPin = {
  x: number;
  y: number;
};

export type ClusterAmenity = {
  id: string;
  type: string;
  image: WizardAsset | null;
  description: string;
};

export type FloorPoint = {
  id: string;
  number: number;
  room: string;
  description: string;
  x: number;
  y: number;
};

export type FloorPlan = {
  id: string;
  name: string;
  image: WizardAsset | null;
  points: FloorPoint[];
};

export type PropertyTypeData = {
  id: string;
  name: string;
  totalUnits: number;
  unitSize: { unit: UnitSizeUnit; value: number };
  lotSize: { unit: UnitSizeUnit; value: number };
  bedrooms: number;
  bathrooms: number;
  floors: number;
  garage: number;
  availability: 'Available' | 'Sold out' | 'Coming soon';
  description: string;
  basePrice: number;
  monthlyInstallment: number;
  downPaymentPercent: number;
  loanTenure: number;
  interestRate: number;
  fixedPeriodYears: number;
  paymentMethods: string[];
  additionalFees: string[];
  specialOffers: string[];
  cover: WizardAsset | null;
  gallery: Record<string, WizardAsset[]>;
  floorPlans: FloorPlan[];
  preview360: string;
  amenities: string[];
};

export type ClusterWizardData = {
  details: {
    name: string;
    tagline: string;
    description: string;
  };
  location: {
    country: string;
    city: string;
    district: string;
    address: string;
    mapPin: MapPin | null;
  };
  specifications: {
    clusterType: string;
    floorType: string;
    singleFloorSize: number;
    doorWindowType: string;
    electricityCapacity: number;
    totalPropertyTypes: number;
    totalUnits: number;
    propertyTypesAvailable: string[];
    clusterSizeUnit: UnitSizeUnit;
    clusterSize: number;
  };
  amenities: ClusterAmenity[];
  cover: WizardAsset | null;
  gallery: Record<string, WizardAsset[]>;
  brochures: WizardAsset[];
  propertyTypes: PropertyTypeData[];
  propertyDraft: PropertyTypeData | null;
};

export type WizardState = {
  data: ClusterWizardData;
  currentStep: number;
  currentSubstep: string;
  validSubsteps: Record<string, boolean>;
  dirty: boolean;
  publishDialogOpen: boolean;
};

export type WizardAction =
  | { type: 'SET_ROUTE'; step: number; substep: string }
  | { type: 'SET_DATA'; data: Partial<ClusterWizardData> }
  | { type: 'SET_VALID'; key: string; valid: boolean }
  | { type: 'SET_DIRTY'; dirty: boolean }
  | { type: 'SET_PUBLISH_DIALOG'; open: boolean }
  | { type: 'ADD_PROPERTY_TYPE'; propertyType: PropertyTypeData }
  | { type: 'DELETE_PROPERTY_TYPE'; id: string }
  | { type: 'SET_PROPERTY_DRAFT'; propertyDraft: PropertyTypeData | null };

export type ClusterSubmitMode = 'publish' | 'draft' | 'edit';

export type WizardStepMeta = {
  step: number;
  title: string;
  description: string;
  substeps: { id: string; label: string }[];
};
