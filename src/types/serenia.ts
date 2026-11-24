export type ClusterStatus = 'draft' | 'planned' | 'opened' | 'closed';
export type PropertyAvailability = 'available' | 'sold_out' | 'coming_soon';
export type RequestStatus = 'new' | 'confirmed' | 'done' | 'cancelled';
export type MeasurementUnit = 'm²' | 'ft²';

export type MediaRef =
  | { kind: 'url'; url: string }
  | { kind: 'file'; fileId: string; name: string; size: number; mimeType: string };

export type MapPin = { x: number; y: number };

export type ClusterLocation = {
  country: string;
  city: string;
  district: string;
  address: string;
  mapPin: MapPin | null;
};

export type ClusterSpecifications = {
  clusterType: string;
  floorType: string;
  singleFloorSize: number;
  doorWindowType: string;
  electricityCapacityVa: number;
  clusterSize: { value: number; unit: MeasurementUnit };
  propertyTypesAvailable: string[];
  estimatedTypes: number;
  estimatedUnits: number;
  stairs?: string;
};

export type ClusterAmenity = {
  id: string;
  type: string;
  image: MediaRef | null;
  description: string;
};

export type GalleryImage = {
  id: string;
  category: string;
  image: MediaRef;
};

export type ClusterDocument = {
  id: string;
  name: string;
  size: number;
  file: MediaRef;
};

export type ClusterMedia = {
  cover: MediaRef | null;
  gallery: GalleryImage[];
  documents: ClusterDocument[];
};

export type NearestPlace = {
  name: string;
  distanceKm: number;
  driveMinutes: number;
};

export type Cluster = {
  id: string;
  code: string;
  name: string;
  tagline: string;
  description: string;
  status: ClusterStatus;
  location: ClusterLocation;
  specs: ClusterSpecifications;
  amenities: { custom: ClusterAmenity[] };
  media: ClusterMedia;
  nearestPlaces: NearestPlace[];
  unitStatus: { sold: number; onRepair: number };
  createdAt: string;
  updatedAt: string;
};

export type PropertyPricing = {
  basePrice: number;
  monthlyInstallment: number;
  downPaymentPercent: number;
  loanTenureYears: number;
  interestRatePercent: number;
  interestFixedYears: number;
  paymentMethods: string[];
  additionalFees: string[];
  specialOffers: string[];
};

export type FloorPoint = {
  number: number;
  room: string;
  description: string;
  x: number;
  y: number;
};

export type PropertyFloorPlan = {
  id: string;
  label: string;
  image: MediaRef | null;
  points: FloorPoint[];
};

export type PropertyType = {
  id: string;
  clusterId: string;
  name: string;
  totalUnit: number;
  unitSize: { value: number; unit: MeasurementUnit };
  lotSize: { value: number; unit: MeasurementUnit };
  bedrooms: number;
  bathrooms: number;
  floors: number;
  garage: number;
  availability: PropertyAvailability;
  description: string;
  pricing: PropertyPricing;
  cover: MediaRef | null;
  gallery: GalleryImage[];
  floorPlans: PropertyFloorPlan[];
  preview360Url: string;
  amenities: { indoor: string[]; outdoor: string[]; safety: string[] };
  createdAt: string;
  updatedAt: string;
};

export type ClusterHistoryEntry = {
  id: string;
  clusterId: string;
  author: string;
  createdAt: string;
  description: string;
};

export type UnitStats = {
  total: number;
  available: number;
  sold: number;
  onRepair: number;
};

export type ClusterSummary = {
  totalTypes: number;
  totalUnits: number;
  priceFrom: number | null;
  unitStats: UnitStats;
};

export type ClusterWithSummary = Cluster & { summary: ClusterSummary };

export type ClusterSpecificationsDisplay = {
  landAndBuildingSize: string;
  houseStyle: string;
  totalFloor: string;
  bedrooms: string;
  bathrooms: string;
  floorType: string;
  stairs: string;
  doorWindow: string;
  electricityCapacity: string;
  specialAmenities: string;
};

export type ClusterDetails = ClusterWithSummary & {
  propertyTypes: PropertyType[];
  specificationsDisplay: ClusterSpecificationsDisplay;
};

export type ClusterStats = {
  totalClusters: number;
  totalTypes: number;
  totalProperties: number;
  availableUnits: number;
  trends: {
    totalProperties?: number;
    availableUnits?: number;
  } | null;
};

export type TourRequest = {
  id: string;
  name: string;
  clusterId: string;
  unit: string;
  email: string;
  phone: string;
  tourDate: string;
  tourTime: string;
  status: RequestStatus;
  createdAt: string;
};

export type NewTourRequest = Omit<TourRequest, 'id' | 'createdAt' | 'status'> & {
  status?: RequestStatus;
};

export type RequestFilters = {
  clusterId?: string;
  status?: RequestStatus;
  search?: string;
};

export type AnalyticsData = {
  upcomingTours: number;
  newRequests: number;
  tourRequestsByMonth: Partial<Record<string, number>>;
  tourRequestsByCluster: Record<string, number>;
  inquiries: { total: number; answered: number; pending: number; escalated: number };
  trends: {
    properties: number;
    availableUnits: number;
    upcomingTours: number;
    newRequests: number;
  };
};

export type DashboardStats = {
  totalProperties: number;
  availableUnits: number;
  upcomingTours: number;
  newRequests: number;
  trends: AnalyticsData['trends'] | null;
};

export type ClusterUnitsSummary = {
  clusterId: string;
  name: string;
  totalUnits: number;
  availableUnits: number;
  percentage: number;
};

export type TourRequestsByMonth = {
  month: string;
  year: number;
  requests: number;
};

export type TourRequestsByCluster = {
  clusterId: string;
  cluster: string;
  shortName: string;
  requests: number;
};

export type InquirySummary = AnalyticsData['inquiries'];

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
};

export type UserSession = {
  userId: string;
  createdAt: string;
};

export type ClusterWizardPropertyType = Omit<PropertyType, 'clusterId' | 'createdAt' | 'updatedAt'>;

export type ClusterWizardPayload = {
  details: { name: string; tagline: string; description: string };
  location: ClusterLocation;
  specs: ClusterSpecifications;
  amenities: { custom: ClusterAmenity[] };
  media: ClusterMedia;
  nearestPlaces: NearestPlace[];
  propertyTypes: ClusterWizardPropertyType[];
  propertyDraft: ClusterWizardPropertyType | null;
};

export type WizardPosition = { step: number; substep: string };

export type WizardAutosave = {
  clusterId: string | null;
  data: ClusterWizardPayload;
  position: WizardPosition;
  savedAt: string;
};

export type SearchCategory = 'all' | 'property' | 'request' | 'blog';

export type PropertySearchResult = {
  propertyType: PropertyType;
  cluster: Cluster;
};

export type RequestSearchResult = {
  request: TourRequest;
  cluster: Cluster;
};

export type SearchResults = {
  properties: PropertySearchResult[];
  requests: RequestSearchResult[];
};

export type StoredCollections = {
  clusters: Cluster[];
  propertyTypes: PropertyType[];
  clusterHistory: ClusterHistoryEntry[];
  requests: TourRequest[];
  analytics: AnalyticsData;
  settings: { defaultAmenities: string[] };
  session: UserSession | null;
  wizardAutosave: WizardAutosave | null;
};
