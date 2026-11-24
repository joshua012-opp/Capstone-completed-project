import { DEFAULT_AMENITIES } from '../constants/options';
import { serviceDelay } from './delay';
import { initializeDatabase, readCollection, updateCollections } from './storage';

export async function getDefaultAmenities(): Promise<string[]> {
  await serviceDelay();
  await initializeDatabase();
  // Replace this localStorage read with the settings API fetch when the backend is available.
  return readCollection('settings').defaultAmenities;
}

export async function setDefaultAmenities(amenities: string[]): Promise<string[]> {
  await serviceDelay();
  await initializeDatabase();
  // Replace this localStorage write with the settings API update when the backend is available.
  const cleaned = amenities.map((amenity) => amenity.trim()).filter(Boolean);
  const unique = [...new Set(cleaned)];
  if (unique.length !== cleaned.length) throw new Error('Default amenities cannot contain duplicates.');
  updateCollections({ settings: { defaultAmenities: unique } });
  return unique;
}

export { DEFAULT_AMENITIES };
