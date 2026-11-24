import { DEFAULT_AMENITIES } from '../constants/options';
import type {
  AnalyticsData,
  Cluster,
  ClusterHistoryEntry,
  PropertyType,
  StoredCollections,
  TourRequest,
} from '../types/serenia';

type SeedCollections = Pick<
  StoredCollections,
  'clusters' | 'propertyTypes' | 'clusterHistory' | 'requests' | 'analytics' | 'settings' | 'session' | 'wizardAutosave'
>;

type ClusterSeed = Omit<Cluster, 'media' | 'amenities' | 'createdAt' | 'updatedAt'> & {
  initialPrice: number;
  typeCount: number;
};

function imageRef(clusterId: string) {
  return { kind: 'url' as const, url: `/images/${clusterId}.svg` };
}

function seedGallery(clusterId: string): PropertyType['gallery'] {
  const image = imageRef(clusterId);
  return [
    { id: `${clusterId}-outside`, category: 'Outside', image },
    { id: `${clusterId}-bedroom`, category: 'Bedroom', image },
    { id: `${clusterId}-living-room`, category: 'Living room', image },
  ];
}

const clusterSeeds: ClusterSeed[] = [
  {
    id: 'liora-estate',
    code: 'CL-LIO-001',
    name: 'Liora estate',
    tagline: 'Elegant living, redefined',
    description: 'Premium cluster with modern architecture, a private clubhouse, and 24/7 security — offering both style and peace of mind for residents.',
    status: 'opened',
    location: {
      country: 'England',
      city: 'London',
      district: 'Selhurst',
      address: 'Serenia Residences, Harmony Street No. 12, Selhurst, London, England',
      mapPin: null,
    },
    specs: {
      clusterType: 'Contemporary residential',
      floorType: 'Polished concrete',
      singleFloorSize: 160,
      doorWindowType: 'Aluminium frame',
      electricityCapacityVa: 2200,
      clusterSize: { value: 6800, unit: 'm²' },
      propertyTypesAvailable: ['House', 'Villa', 'Townhouse'],
      estimatedTypes: 7,
      estimatedUnits: 44,
      stairs: 'Reinforced concrete',
    },
    nearestPlaces: [
      { name: 'Selhurst International School', distanceKm: 1.8, driveMinutes: 5 },
      { name: 'Selhurst Mall & Lifestyle Center', distanceKm: 3.1, driveMinutes: 9 },
      { name: 'Royal Care Hospital', distanceKm: 4.2, driveMinutes: 11 },
      { name: 'Selhurst Central Station', distanceKm: 2.4, driveMinutes: 7 },
    ],
    unitStatus: { sold: 10, onRepair: 0 },
    initialPrice: 120000,
    typeCount: 7,
  },
  {
    id: 'nava-heights',
    code: 'CL-NAV-002',
    name: 'Nava heights',
    tagline: 'Nature meets lifestyle',
    description: 'Designed for eco-living with wide open spaces, scenic jogging tracks, and elevated views that bring nature closer to home.',
    status: 'opened',
    location: {
      country: 'England',
      city: 'London',
      district: 'Selhurst',
      address: 'Serenia Residences, Willow Avenue No. 8, Selhurst, London, England',
      mapPin: null,
    },
    specs: {
      clusterType: 'Eco-living community',
      floorType: 'Stone',
      singleFloorSize: 145,
      doorWindowType: 'uPVC',
      electricityCapacityVa: 2000,
      clusterSize: { value: 5900, unit: 'm²' },
      propertyTypesAvailable: ['House', 'Apartment', 'Townhouse'],
      estimatedTypes: 8,
      estimatedUnits: 34,
      stairs: 'Timber with steel supports',
    },
    nearestPlaces: [
      { name: 'Nava Heights Primary School', distanceKm: 2.3, driveMinutes: 6 },
      { name: 'Willow Shopping Center', distanceKm: 3.8, driveMinutes: 11 },
      { name: 'Royal Care Hospital', distanceKm: 5.2, driveMinutes: 14 },
      { name: 'Selhurst Central Station', distanceKm: 2.9, driveMinutes: 8 },
    ],
    unitStatus: { sold: 8, onRepair: 0 },
    initialPrice: 98000,
    typeCount: 8,
  },
  {
    id: 'aruna-residence',
    code: 'CL-ARU-003',
    name: 'Aruna residence',
    tagline: 'The modern comfort',
    description: 'Aruna Residence offers modern residences with an elegant touch, designed to provide maximum comfort for families. With functional layouts, optimal natural lighting, and high-quality materials.',
    status: 'opened',
    location: {
      country: 'England',
      city: 'London',
      district: 'Selhurst',
      address: 'Serenia Residences, Harmony Street No. 12, Selhurst, London, England',
      mapPin: { x: 52, y: 48 },
    },
    specs: {
      clusterType: 'Modern minimalist',
      floorType: '60×60 granite tiles',
      singleFloorSize: 1200,
      doorWindowType: 'Solid wood/aluminum',
      electricityCapacityVa: 2200,
      clusterSize: { value: 5200, unit: 'ft²' },
      propertyTypesAvailable: ['House'],
      estimatedTypes: 3,
      estimatedUnits: 28,
      stairs: 'Lightweight steel frame',
    },
    nearestPlaces: [
      { name: 'Greenfield International School', distanceKm: 2.1, driveMinutes: 5 },
      { name: 'Selhurst Mall & Lifestyle Center', distanceKm: 3.4, driveMinutes: 10 },
      { name: 'Royal Care Hospital', distanceKm: 4.8, driveMinutes: 12 },
      { name: 'Selhurst Central Station', distanceKm: 2.7, driveMinutes: 8 },
    ],
    unitStatus: { sold: 6, onRepair: 0 },
    initialPrice: 85000,
    typeCount: 3,
  },
  {
    id: 'velora-park',
    code: 'CL-VEL-004',
    name: 'Velora park',
    tagline: 'Dynamic living, urban vibe',
    description: 'Contemporary cluster with stylish facades, pocket parks, and direct access to shopping and dining hubs.',
    status: 'closed',
    location: {
      country: 'England',
      city: 'London',
      district: 'Selhurst',
      address: 'Serenia Residences, Maple Lane No. 22, Selhurst, London, England',
      mapPin: null,
    },
    specs: {
      clusterType: 'Urban contemporary',
      floorType: 'Tile',
      singleFloorSize: 135,
      doorWindowType: 'Steel frame',
      electricityCapacityVa: 2400,
      clusterSize: { value: 6100, unit: 'm²' },
      propertyTypesAvailable: ['House', 'Apartment'],
      estimatedTypes: 12,
      estimatedUnits: 30,
      stairs: 'Reinforced concrete',
    },
    nearestPlaces: [
      { name: 'Velora Community School', distanceKm: 1.9, driveMinutes: 5 },
      { name: 'Velora Park Shopping Center', distanceKm: 2.8, driveMinutes: 8 },
      { name: 'Royal Care Hospital', distanceKm: 4.6, driveMinutes: 12 },
      { name: 'Selhurst Central Station', distanceKm: 3.2, driveMinutes: 9 },
    ],
    unitStatus: { sold: 10, onRepair: 0 },
    initialPrice: 105000,
    typeCount: 12,
  },
  {
    id: 'seraya-grove',
    code: 'CL-SER-005',
    name: 'Seraya grove',
    tagline: 'Living with natural touch',
    description: 'A vibrant cluster blending modern housing with lush greenery, close to schools and community spaces.',
    status: 'opened',
    location: {
      country: 'England',
      city: 'London',
      district: 'Selhurst',
      address: 'Serenia Residences, Elm Street No. 19, Selhurst, London, England',
      mapPin: null,
    },
    specs: {
      clusterType: 'Nature-inspired community',
      floorType: 'Hardwood',
      singleFloorSize: 155,
      doorWindowType: 'Timber',
      electricityCapacityVa: 2100,
      clusterSize: { value: 6400, unit: 'm²' },
      propertyTypesAvailable: ['House', 'Villa'],
      estimatedTypes: 6,
      estimatedUnits: 24,
      stairs: 'Timber with steel supports',
    },
    nearestPlaces: [
      { name: 'Seraya Grove School', distanceKm: 2, driveMinutes: 6 },
      { name: 'Seraya Community Market', distanceKm: 3.5, driveMinutes: 10 },
      { name: 'Royal Care Hospital', distanceKm: 5.1, driveMinutes: 14 },
      { name: 'Selhurst Central Station', distanceKm: 2.6, driveMinutes: 8 },
    ],
    unitStatus: { sold: 6, onRepair: 0 },
    initialPrice: 95000,
    typeCount: 6,
  },
];

function clusterAmenities(clusterId: string) {
  if (clusterId !== 'aruna-residence') return { custom: [] };
  const image = imageRef(clusterId);
  return {
    custom: [
      { id: 'aruna-amenity-1', type: 'Landscaped Parks', image, description: 'Green open areas with well-maintained walking paths.' },
      { id: 'aruna-amenity-2', type: 'Jogging Track', image, description: 'A dedicated track for outdoor exercise and walking.' },
      { id: 'aruna-amenity-3', type: 'Central Playground', image, description: 'A safe outdoor play area for children.' },
      { id: 'aruna-amenity-4', type: 'Community Hall', image, description: 'A welcoming venue for resident gatherings and events.' },
    ],
  };
}

function createClusters(): Cluster[] {
  return clusterSeeds.map(({ initialPrice: _price, typeCount: _count, ...cluster }, index) => {
    const timestamp = new Date(Date.UTC(2025, 0, index + 1)).toISOString();
    const image = imageRef(cluster.id);
    return {
      ...cluster,
      amenities: clusterAmenities(cluster.id),
      media: {
        cover: image,
        gallery: [
          { id: `${cluster.id}-gallery-1`, category: 'Outdoor', image },
          { id: `${cluster.id}-gallery-2`, category: 'Living room', image },
          { id: `${cluster.id}-gallery-3`, category: 'Bedroom', image },
        ],
        documents: [],
      },
      createdAt: timestamp,
      updatedAt: timestamp,
    };
  });
}

function typeLetter(index: number): string {
  return String.fromCharCode(65 + index);
}

function createPropertyTypes(): PropertyType[] {
  const result: PropertyType[] = [];

  clusterSeeds.forEach((seed) => {
    const clusterImage = imageRef(seed.id);
    const unitsPerType = Math.floor(seed.specs.estimatedUnits / seed.typeCount);
    const remainder = seed.specs.estimatedUnits % seed.typeCount;

    for (let index = 0; index < seed.typeCount; index += 1) {
      const letter = typeLetter(index);
      const isAruna = seed.id === 'aruna-residence';
      const isArunaA = isAruna && index === 0;
      const floors = isAruna ? 2 : 1 + (index % 2);
      const timestamp = new Date(Date.UTC(2025, 0, index + 1)).toISOString();
      result.push({
        id: `${seed.id}-type-${letter.toLowerCase()}`,
        clusterId: seed.id,
        name: `${seed.name.split(' ')[0]} Type ${letter}`,
        totalUnit: unitsPerType + (index < remainder ? 1 : 0),
        unitSize: isAruna
          ? { value: 2000 + index * 500, unit: 'ft²' }
          : { value: 150 + index * 10, unit: 'm²' },
        lotSize: isAruna
          ? { value: 2400 + index * 400, unit: 'ft²' }
          : { value: 190 + index * 10, unit: 'm²' },
        bedrooms: isAruna ? 3 : 2 + (index % 3),
        bathrooms: isAruna ? 2 : 1 + (index % 3),
        floors,
        garage: index % 2,
        availability: index % 7 === 6 ? 'sold_out' : 'available',
        description: isArunaA
          ? 'Compact & efficient living - minimalist housing for practical young families'
          : `${letter} thoughtfully planned home with practical spaces and comfortable modern living.`,
        pricing: {
          basePrice: seed.initialPrice + index * 10000,
          monthlyInstallment: Math.round((seed.initialPrice + index * 10000) / 160),
          downPaymentPercent: 20,
          loanTenureYears: 20,
          interestRatePercent: 5,
          interestFixedYears: 3,
          paymentMethods: ['Cash', 'Bank mortgage'],
          additionalFees: ['Notary', 'Tax'],
          specialOffers: index === 0 ? ['Free legal fee'] : [],
        },
        cover: clusterImage,
        gallery: seedGallery(seed.id),
        floorPlans: [
          {
            id: `${seed.id}-floor-${index + 1}`,
            label: 'Ground floor',
            image: clusterImage,
            points: [],
          },
          ...(floors > 1
            ? [{ id: `${seed.id}-upper-${index + 1}`, label: 'Upper floor', image: clusterImage, points: [] }]
            : []),
        ],
        preview360Url: '',
        amenities: {
          indoor: ['Air conditioning (AC)', 'Built-in wardrobe', 'Kitchen set / pantry'],
          outdoor: ['Balcony / terrace', 'Private garden'],
          safety: ['Security system', 'Smoke detector'],
        },
        createdAt: timestamp,
        updatedAt: timestamp,
      });
    }
  });

  return result;
}

const requestSeedData: Omit<TourRequest, 'id'>[] = [
  { name: 'Alex Johnson', clusterId: 'liora-estate', unit: 'A-18', email: 'alexjohn@gmail.com', phone: '+1 202 555 0147', tourDate: '2025-06-12', tourTime: '09:00 am - 10:00 am', status: 'new', createdAt: '2025-06-11T13:00:00.000Z' },
  { name: 'Miya Agustine', clusterId: 'aruna-residence', unit: 'B-12', email: 'miya.agustine@gmail.com', phone: '+1 202 555 0184', tourDate: '2025-06-14', tourTime: '11:00 am - 12:00 pm', status: 'confirmed', createdAt: '2025-06-10T12:00:00.000Z' },
  { name: 'Laura Smith', clusterId: 'aruna-residence', unit: 'C-11', email: 'laura.smith@gmail.com', phone: '+1 202 555 0196', tourDate: '2025-06-15', tourTime: '02:00 pm - 03:00 pm', status: 'new', createdAt: '2025-06-09T12:00:00.000Z' },
  { name: 'David Brown', clusterId: 'nava-heights', unit: 'A-08', email: 'david.brown@gmail.com', phone: '+1 202 555 0148', tourDate: '2025-06-17', tourTime: '10:00 am - 11:00 am', status: 'confirmed', createdAt: '2025-06-08T12:00:00.000Z' },
  { name: 'Olivia Wilson', clusterId: 'velora-park', unit: 'D-04', email: 'olivia.wilson@gmail.com', phone: '+1 202 555 0149', tourDate: '2025-06-18', tourTime: '01:00 pm - 02:00 pm', status: 'new', createdAt: '2025-06-07T12:00:00.000Z' },
  { name: 'Noah Taylor', clusterId: 'seraya-grove', unit: 'B-16', email: 'noah.taylor@gmail.com', phone: '+1 202 555 0150', tourDate: '2025-06-19', tourTime: '09:00 am - 10:00 am', status: 'done', createdAt: '2025-06-06T12:00:00.000Z' },
  { name: 'Ava Martinez', clusterId: 'liora-estate', unit: 'C-02', email: 'ava.martinez@gmail.com', phone: '+1 202 555 0151', tourDate: '2025-06-20', tourTime: '03:00 pm - 04:00 pm', status: 'confirmed', createdAt: '2025-06-05T12:00:00.000Z' },
  { name: 'Ethan Davis', clusterId: 'nava-heights', unit: 'A-21', email: 'ethan.davis@gmail.com', phone: '+1 202 555 0152', tourDate: '2025-06-21', tourTime: '10:00 am - 11:00 am', status: 'cancelled', createdAt: '2025-06-04T12:00:00.000Z' },
  { name: 'Sophia Anderson', clusterId: 'aruna-residence', unit: 'A-03', email: 'sophia.anderson@gmail.com', phone: '+1 202 555 0153', tourDate: '2025-06-22', tourTime: '11:00 am - 12:00 pm', status: 'new', createdAt: '2025-06-03T12:00:00.000Z' },
  { name: 'Lucas Thomas', clusterId: 'velora-park', unit: 'E-09', email: 'lucas.thomas@gmail.com', phone: '+1 202 555 0154', tourDate: '2025-06-23', tourTime: '01:00 pm - 02:00 pm', status: 'confirmed', createdAt: '2025-06-02T12:00:00.000Z' },
  { name: 'Isabella Jackson', clusterId: 'seraya-grove', unit: 'A-13', email: 'isabella.jackson@gmail.com', phone: '+1 202 555 0155', tourDate: '2025-06-24', tourTime: '02:00 pm - 03:00 pm', status: 'new', createdAt: '2025-06-01T12:00:00.000Z' },
  { name: 'James White', clusterId: 'liora-estate', unit: 'B-07', email: 'james.white@gmail.com', phone: '+1 202 555 0156', tourDate: '2025-06-25', tourTime: '09:00 am - 10:00 am', status: 'done', createdAt: '2025-05-31T12:00:00.000Z' },
];

const analytics: AnalyticsData = {
  upcomingTours: 45,
  newRequests: 21,
  tourRequestsByMonth: {
    Jan: 27,
    Feb: 33,
    Mar: 31,
    Apr: 45,
    May: 38,
    Jun: 55,
    Jul: 50,
    Aug: 63,
    Sep: 78,
  },
  tourRequestsByCluster: {
    'liora-estate': 40,
    'nava-heights': 38,
    'aruna-residence': 28,
    'velora-park': 22,
    'seraya-grove': 18,
  },
  inquiries: { total: 240, answered: 160, pending: 45, escalated: 15 },
  trends: { properties: 6, availableUnits: 5, upcomingTours: 12, newRequests: 20 },
};

const history: ClusterHistoryEntry[] = [
  {
    id: 'aruna-history-1',
    clusterId: 'aruna-residence',
    author: 'Harrison Wells',
    createdAt: '2025-06-16T08:30:00.000Z',
    description: 'Changed the tagline from "The Comfort zone" into "The modern comfort" and the price from $115,000 into $120,000.',
  },
  {
    id: 'aruna-history-2',
    clusterId: 'aruna-residence',
    author: 'Harrison Wells',
    createdAt: '2025-06-14T14:15:00.000Z',
    description: 'Updated the total units in Velora Park from 60 into 64 and total types from 10 into 12.',
  },
  {
    id: 'aruna-history-3',
    clusterId: 'aruna-residence',
    author: 'Harrison Wells',
    createdAt: '2025-06-10T09:45:00.000Z',
    description: 'Changed the cluster name from "Harmony Residence" into "Aruna Residence" and updated the tagline to "The modern comfort".',
  },
  {
    id: 'aruna-history-4',
    clusterId: 'aruna-residence',
    author: 'Harrison Wells',
    createdAt: '2025-06-05T16:05:00.000Z',
    description: 'Modified the location address of Nava Heights from Willow Avenue No. 6 into Willow Avenue No. 8.',
  },
  {
    id: 'aruna-history-5',
    clusterId: 'aruna-residence',
    author: 'Harrison Wells',
    createdAt: '2025-06-02T10:30:00.000Z',
    description: 'Updated the cluster status of Seraya Grove from Planned into Opened and changed the tagline to "Living with natural touch".',
  },
];

export function createSeedData(): SeedCollections {
  return {
    clusters: createClusters(),
    propertyTypes: createPropertyTypes(),
    clusterHistory: history,
    requests: requestSeedData.map((request, index) => ({ ...request, id: `request-${String(index + 1).padStart(3, '0')}` })),
    analytics,
    settings: { defaultAmenities: [...DEFAULT_AMENITIES] },
    session: null,
    wizardAutosave: null,
  };
}
