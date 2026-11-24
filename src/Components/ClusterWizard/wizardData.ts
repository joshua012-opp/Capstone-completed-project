import coverImage from '../../assets/Aruna Residence.jpg';
import { CLUSTER_GALLERY_CATEGORIES, PROPERTY_GALLERY_CATEGORIES } from '../../constants/options';
import type {
  ClusterAmenity,
  ClusterWizardData,
  FloorPlan,
  PropertyTypeData,
  WizardAsset,
  WizardState,
  WizardStepMeta,
} from '../../types/clusterWizard';

export const WIZARD_STEPS: WizardStepMeta[] = [
  {
    step: 1,
    title: 'Details cluster',
    description: 'Tell about the cluster',
    substeps: [
      { id: 'basic-information', label: 'Basic information' },
      { id: 'location', label: 'Cluster location' },
    ],
  },
  {
    step: 2,
    title: 'Cluster specs',
    description: 'Add complete specifications',
    substeps: [
      { id: 'detail-specification', label: 'Detail specification' },
      { id: 'amenities', label: 'Amenities & facilities' },
    ],
  },
  {
    step: 3,
    title: 'House media & gallery',
    description: 'Cover, preview/gallery, brochure',
    substeps: [
      { id: 'cover', label: 'Cover' },
      { id: 'gallery', label: 'Gallery' },
      { id: 'brochure', label: 'Brochure' },
    ],
  },
  {
    step: 4,
    title: 'Type & units',
    description: 'Adding property types and units',
    substeps: [
      { id: 'types', label: 'Types' },
      { id: 'type-details', label: 'Details' },
      { id: 'type-pricing', label: 'Pricing' },
      { id: 'type-gallery', label: 'Gallery' },
      { id: 'type-floor-plan', label: 'Floor plan' },
      { id: 'type-amenities', label: 'Amenities' },
      { id: 'types-list', label: 'Types list' },
    ],
  },
];

export const REQUIRED_SUBSTEPS = [
  '1:basic-information',
  '1:location',
  '2:detail-specification',
  '2:amenities',
  '3:cover',
  '3:gallery',
] as const;

export function emptyPropertyType(): PropertyTypeData {
  return {
    id: `type-${crypto.randomUUID()}`,
    name: '',
    totalUnits: 0,
    unitSize: { unit: 'm²', value: 0 },
    lotSize: { unit: 'm²', value: 0 },
    bedrooms: 0,
    bathrooms: 0,
    floors: 1,
    garage: 0,
    availability: 'Available',
    description: '',
    basePrice: 0,
    monthlyInstallment: 0,
    downPaymentPercent: 0,
    loanTenure: 10,
    interestRate: 0,
    fixedPeriodYears: 3,
    paymentMethods: [],
    additionalFees: [],
    specialOffers: [],
    cover: null,
    gallery: Object.fromEntries(PROPERTY_GALLERY_CATEGORIES.map((category) => [category, []])),
    floorPlans: [emptyFloorPlan(0)],
    preview360: '',
    amenities: [],
  };
}

export function emptyFloorPlan(index: number): FloorPlan {
  return {
    id: `floor-${crypto.randomUUID()}`,
    name: index === 0 ? 'Ground floor' : `Floor ${index + 1}`,
    image: null,
    points: [],
  };
}

export function emptyAmenity(): ClusterAmenity {
  return {
    id: `amenity-${crypto.randomUUID()}`,
    type: '',
    image: null,
    description: '',
  };
}

export function emptyWizardData(): ClusterWizardData {
  return {
    details: { name: '', tagline: '', description: '' },
    location: { country: 'United States', city: '', district: '', address: '', mapPin: null },
    specifications: {
      clusterType: '',
      floorType: '',
      singleFloorSize: 0,
      doorWindowType: '',
      electricityCapacity: 0,
      totalPropertyTypes: 0,
      totalUnits: 0,
      propertyTypesAvailable: [],
      clusterSizeUnit: 'm²',
      clusterSize: 0,
    },
    amenities: [emptyAmenity()],
    cover: null,
    gallery: Object.fromEntries(CLUSTER_GALLERY_CATEGORIES.map((category) => [category, []])),
    brochures: [],
    propertyTypes: [],
    propertyDraft: null,
  };
}

function placeholderAsset(name: string, preview: string, size = 5_033_164): WizardAsset {
  return {
    id: `asset-${name}`,
    name,
    size,
    type: 'image/jpeg',
    file: null,
    preview,
    progress: 100,
  };
}

function editPropertyType(): PropertyTypeData {
  const property = emptyPropertyType();
  return {
    ...property,
    id: 'edit-type-a',
    name: 'Aruna Type A',
    totalUnits: 24,
    unitSize: { unit: 'm²', value: 186 },
    lotSize: { unit: 'm²', value: 240 },
    bedrooms: 3,
    bathrooms: 2,
    floors: 1,
    garage: 1,
    description: 'Compact and efficient minimalist living for practical young families.',
    basePrice: 120000,
    monthlyInstallment: 750,
    downPaymentPercent: 20,
    interestRate: 5,
    fixedPeriodYears: 3,
    paymentMethods: ['Cash', 'Bank mortgage'],
    cover: placeholderAsset('aruna_type_a.png', coverImage),
    gallery: {
      ...property.gallery,
      Outside: [
        placeholderAsset('aruna_exterior_1.jpg', coverImage),
        placeholderAsset('aruna_exterior_2.jpg', coverImage),
      ],
    },
    floorPlans: [{
      ...emptyFloorPlan(0),
      image: placeholderAsset('aruna_ground_floor.png', coverImage),
      points: [
        { id: 'edit-point-1', number: 1, room: 'Kitchen', description: 'Open-plan kitchen.', x: 38, y: 42 },
      ],
    }],
  };
}

export function editPlaceholderData(): ClusterWizardData {
  const data = emptyWizardData();
  const property = editPropertyType();
  return {
    ...data,
    details: {
      name: 'Aruna residence',
      tagline: 'A serene place to grow',
      description: 'Thoughtfully designed family homes in a welcoming community.',
    },
    location: {
      country: 'United States',
      city: 'Aruna City',
      district: 'Greenfield',
      address: '18 Serenia Avenue, Greenfield',
      mapPin: { x: 57, y: 42 },
    },
    specifications: {
      clusterType: 'Residential',
      floorType: 'Concrete',
      singleFloorSize: 186,
      doorWindowType: 'Aluminium frame',
      electricityCapacity: 2200,
      totalPropertyTypes: 1,
      totalUnits: 24,
      propertyTypesAvailable: ['House', 'Villa'],
      clusterSizeUnit: 'm²',
      clusterSize: 5200,
    },
    amenities: [
      { id: 'edit-amenity-1', type: 'Sport center', image: placeholderAsset('sport_center.jpg', coverImage), description: 'A modern community sports center.' },
    ],
    cover: placeholderAsset('cover_aruna_residence.png', coverImage),
    gallery: {
      ...data.gallery,
      Outdoor: [
        placeholderAsset('aruna_outdoor_1.jpg', coverImage),
        placeholderAsset('aruna_outdoor_2.jpg', coverImage),
      ],
      Bedroom: [placeholderAsset('aruna_bedroom_1.jpg', coverImage)],
    },
    brochures: [{
      id: 'edit-brochure-1',
      name: 'aruna_residence_brochure.pdf',
      size: 2_500_000,
      type: 'application/pdf',
      file: null,
      preview: '',
      progress: 100,
    }],
    propertyTypes: [property],
    propertyDraft: null,
  };
}

export function createInitialWizardState(mode: 'create' | 'edit'): WizardState {
  const validSubsteps: Record<string, boolean> = mode === 'edit'
    ? Object.fromEntries([
      ...REQUIRED_SUBSTEPS.map((key): [string, boolean] => [key, true]),
      ['3:brochure', true],
    ])
    : {};
  return {
    data: mode === 'edit' ? editPlaceholderData() : emptyWizardData(),
    currentStep: 1,
    currentSubstep: 'basic-information',
    validSubsteps,
    dirty: false,
    publishDialogOpen: false,
  };
}

export function validKey(step: number, substep: string): string {
  return `${step}:${substep}`;
}

export function isStepComplete(state: WizardState, step: number): boolean {
  const required = REQUIRED_SUBSTEPS.filter((key) => key.startsWith(`${step}:`));
  return required.length > 0 && required.every((key) => state.validSubsteps[key]);
}

export function getFirstIncompleteLocation(state: WizardState): { step: number; substep: string } {
  for (const key of REQUIRED_SUBSTEPS) {
    if (!state.validSubsteps[key]) {
      const [step, substep] = key.split(':');
      return { step: Number(step), substep };
    }
  }
  return { step: 4, substep: 'types' };
}

export function canAccessSubstep(state: WizardState, step: number, substep: string): boolean {
  const stepIndex = WIZARD_STEPS.findIndex((item) => item.step === step);
  if (stepIndex < 0) return false;
  const stepMeta = WIZARD_STEPS[stepIndex];
  if (!stepMeta.substeps.some((item) => item.id === substep)) return false;

  for (const key of REQUIRED_SUBSTEPS) {
    const [requiredStepValue, requiredSubstep] = key.split(':');
    const requiredStep = Number(requiredStepValue);
    if (requiredStep < step && !state.validSubsteps[key]) return false;
    if (requiredStep === step) {
      const requiredIndex = stepMeta.substeps.findIndex((item) => item.id === requiredSubstep);
      const currentIndex = stepMeta.substeps.findIndex((item) => item.id === substep);
      if (requiredIndex < currentIndex && !state.validSubsteps[key]) return false;
    }
  }
  if (step === 4) {
    if (substep === 'types' || substep === 'types-list') return true;
    const typeSubsteps = ['type-details', 'type-pricing', 'type-gallery', 'type-floor-plan', 'type-amenities'];
    const targetIndex = typeSubsteps.indexOf(substep);
    if (targetIndex < 0 || !state.data.propertyDraft) return false;
    return typeSubsteps.slice(0, targetIndex).every((item) => state.validSubsteps[validKey(4, item)]);
  }
  return true;
}

export function isPublishReady(state: WizardState): boolean {
  return REQUIRED_SUBSTEPS.every((key) => state.validSubsteps[key]);
}

export function incompleteRequiredLabels(state: WizardState): string[] {
  return WIZARD_STEPS.flatMap((step) =>
    step.substeps
      .filter((substep) => REQUIRED_SUBSTEPS.includes(validKey(step.step, substep.id) as typeof REQUIRED_SUBSTEPS[number]))
      .filter((substep) => !state.validSubsteps[validKey(step.step, substep.id)])
      .map((substep) => substep.label),
  );
}
