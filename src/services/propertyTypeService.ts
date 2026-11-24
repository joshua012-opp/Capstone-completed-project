import { serviceDelay } from './delay';
import { initializeDatabase, readCollection, updateCollections } from './storage';
import type { PropertyType } from '../types/serenia';

export type NewPropertyType = Omit<PropertyType, 'id' | 'createdAt' | 'updatedAt'>;

export async function getTypesByCluster(clusterId: string): Promise<PropertyType[]> {
  await serviceDelay();
  await initializeDatabase();
  // Replace this localStorage read with a property types API fetch when the backend is available.
  return readCollection('propertyTypes').filter((type) => type.clusterId === clusterId);
}

export async function getTypeById(id: string): Promise<PropertyType | null> {
  await serviceDelay();
  await initializeDatabase();
  // Replace this localStorage lookup with the property type API fetch when the backend is available.
  return readCollection('propertyTypes').find((type) => type.id === id) ?? null;
}

export async function addPropertyType(data: NewPropertyType): Promise<PropertyType> {
  await serviceDelay();
  await initializeDatabase();
  // Replace these localStorage reads and writes with the property type create API when the backend is available.
  const cluster = readCollection('clusters').find((item) => item.id === data.clusterId);
  if (!cluster || cluster.status !== 'opened') {
    throw new Error('Choose an opened cluster before adding a property type.');
  }
  const name = data.name.trim();
  if (!name) throw new Error('Enter a property type name.');
  const propertyTypes = readCollection('propertyTypes');
  if (propertyTypes.some((type) => type.clusterId === cluster.id && type.name.toLowerCase() === name.toLowerCase())) {
    throw new Error('A property type with this name already exists in the selected cluster.');
  }
  if (!Number.isInteger(data.totalUnit) || data.totalUnit < 1) {
    throw new Error('Enter at least one unit.');
  }
  if (![data.bedrooms, data.bathrooms, data.floors, data.garage].every(Number.isInteger)
    || data.bedrooms < 0 || data.bathrooms < 0 || data.floors < 1 || data.garage < 0) {
    throw new Error('Room, floor, and garage counts must be non-negative whole numbers.');
  }
  if (!Number.isFinite(data.unitSize.value) || data.unitSize.value <= 0) {
    throw new Error('Enter a valid unit size.');
  }
  if (!Number.isFinite(data.pricing.basePrice) || data.pricing.basePrice <= 0) {
    throw new Error('Enter a valid base price.');
  }

  const timestamp = new Date().toISOString();
  const propertyType: PropertyType = {
    ...data,
    id: `${cluster.id}-type-${crypto.randomUUID()}`,
    name,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  updateCollections({ propertyTypes: [...propertyTypes, propertyType] });
  return propertyType;
}
