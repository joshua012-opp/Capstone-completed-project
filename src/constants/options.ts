export const CLUSTER_TYPES = [
  'Residential',
  'Mixed-use',
  'Gated community',
  'Apartment community',
  'Modern minimalist',
  'Contemporary residential',
  'Eco-living community',
] as const;

export const FLOOR_TYPES = [
  'Concrete',
  'Tile',
  'Hardwood',
  'Stone',
  '60×60 granite tiles',
] as const;

export const DOOR_WINDOW_TYPES = [
  'Aluminium frame',
  'Timber',
  'uPVC',
  'Steel frame',
  'Solid wood/aluminum',
] as const;

export const AMENITY_TYPES = [
  'Sport center',
  'Playground',
  'Community garden',
  'Swimming pool',
  'Clubhouse',
] as const;

export const LOAN_TENURES = [5, 10, 15, 20] as const;
export const PAYMENT_METHODS = ['Cash', 'Bank mortgage', 'In-house installment'] as const;
export const ADDITIONAL_FEES = ['Notary', 'Tax', 'Admin'] as const;
export const SPECIAL_OFFERS = ['Free legal fee', 'Appliance package', 'No special offer'] as const;
export const ROOM_OPTIONS = ['Kitchen', 'Bedroom', 'Family room', 'Dining room', 'Bathroom', 'Living room'] as const;

export const CLUSTER_GALLERY_CATEGORIES = ['Outdoor', 'Bathroom', 'Bedroom', 'Street', 'Kitchen', 'Living room'] as const;
export const PROPERTY_GALLERY_CATEGORIES = ['Outside', 'Bedroom', 'Bathroom', 'Kitchen', 'Backyard'] as const;

export const COUNTRY_OPTIONS = [
  { name: 'United States', flag: '🇺🇸' },
  { name: 'Nigeria', flag: '🇳🇬' },
  { name: 'Ghana', flag: '🇬🇭' },
  { name: 'United Kingdom', flag: '🇬🇧' },
  { name: 'England', flag: '🏴' },
  { name: 'Canada', flag: '🇨🇦' },
] as const;

export const CITIES_BY_COUNTRY: Record<string, readonly string[]> = {
  'United States': ['New York', 'Los Angeles', 'Chicago', 'Houston'],
  Nigeria: ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan'],
  Ghana: ['Accra', 'Kumasi', 'Tamale'],
  'United Kingdom': ['London', 'Manchester', 'Birmingham', 'Liverpool'],
  England: ['London', 'Manchester', 'Birmingham', 'Liverpool'],
  Canada: ['Toronto', 'Vancouver', 'Montreal', 'Calgary'],
};

export const PROPERTY_AVAILABILITY_OPTIONS = [
  { value: 'Available', label: 'Available' },
  { value: 'Sold out', label: 'Sold out' },
  { value: 'Coming soon', label: 'Coming soon' },
] as const;

export const PROPERTY_AMENITY_GROUPS: Record<string, readonly string[]> = {
  'Indoor amenities': [
    'Air conditioning (AC)', 'Water heater', 'Built-in wardrobe', 'Kitchen set / pantry',
    'Outdoor dining pavilion', 'Cycling track', 'Bathtub', 'Smart home system',
    'Cable TV / Internet ready', 'Co-working space',
  ],
  'Outdoor / Private Amenities': [
    'Private garden', 'Private swimming pool', 'Balcony / terrace', 'Rooftop / sky deck',
    'Outdoor kitchen / BBQ area', 'Carport / garage', 'Private parking spot',
  ],
  'Safety & Utility': [
    'Security system', 'Fire alarm', 'Smoke detector', 'Solar panels', 'Backup generator',
    'Water tank/pump',
  ],
};

export const DEFAULT_AMENITIES = [
  'Playground',
  'Garden / Green Space',
  'Jogging Track',
  'Gym & Fitness Center',
  'Security Post (24/7)',
  'Parking Area',
  'Clubhouse',
  'Community Hall',
] as const;
