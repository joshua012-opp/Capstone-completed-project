import { del, get, keys, set } from 'idb-keyval';
import type { MediaRef } from '../types/serenia';
import { emitDataEvent } from './dataEvents';
import { serviceDelay } from './delay';
import { fileStore, initializeDatabase, readAllCollections } from './storage';

const MAX_FILE_SIZE = 20 * 1024 * 1024;

function isQuotaError(error: unknown): boolean {
  return error instanceof DOMException
    && (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED');
}

function fileStorageError(error: unknown): Error {
  if (isQuotaError(error)) {
    return new Error('Storage is full. Remove large files or records, then try again.');
  }
  return error instanceof Error ? error : new Error('Unable to access stored files.');
}

export async function saveFile(file: File): Promise<MediaRef> {
  await serviceDelay();
  await initializeDatabase();
  if (file.size > MAX_FILE_SIZE) throw new Error('Files must be 20MB or smaller.');

  const fileId = crypto.randomUUID();
  try {
    // Replace this IndexedDB write with the real file upload endpoint when a backend is available.
    await set(fileId, file, fileStore);
  } catch (error) {
    throw fileStorageError(error);
  }
  emitDataEvent('clusters');
  return {
    kind: 'file',
    fileId,
    name: file.name,
    size: file.size,
    mimeType: file.type || 'application/octet-stream',
  };
}

export async function getFileUrl(media: MediaRef): Promise<string> {
  await serviceDelay();
  await initializeDatabase();
  if (media.kind === 'url') return media.url;

  let blob: Blob | undefined;
  try {
    blob = await get<Blob>(media.fileId, fileStore);
  } catch (error) {
    throw fileStorageError(error);
  }
  if (!blob) throw new Error(`Stored file "${media.name}" could not be found.`);
  return URL.createObjectURL(blob);
}

export async function deleteFile(fileId: string): Promise<void> {
  await serviceDelay();
  await initializeDatabase();
  try {
    // Replace this IndexedDB delete with the real file deletion endpoint when a backend is available.
    await del(fileId, fileStore);
  } catch (error) {
    throw fileStorageError(error);
  }
  emitDataEvent('clusters');
}

function collectFileReferences(value: unknown, referenced: Set<string>): void {
  if (Array.isArray(value)) {
    value.forEach((item) => collectFileReferences(item, referenced));
    return;
  }
  if (!value || typeof value !== 'object') return;

  const record = value as Record<string, unknown>;
  if (record.kind === 'file' && typeof record.fileId === 'string') referenced.add(record.fileId);
  Object.values(record).forEach((item) => collectFileReferences(item, referenced));
}

async function removeUnreferencedFiles(): Promise<number> {
  const data = readAllCollections();
  const referenced = new Set<string>();
  collectFileReferences(data.clusters, referenced);
  collectFileReferences(data.propertyTypes, referenced);
  collectFileReferences(data.wizardAutosave, referenced);

  let removed = 0;
  try {
    const storedKeys = await keys(fileStore);
    for (const key of storedKeys) {
      if (typeof key === 'string' && !referenced.has(key)) {
        await del(key, fileStore);
        removed += 1;
      }
    }
  } catch (error) {
    throw fileStorageError(error);
  }
  return removed;
}

export async function collectGarbage(): Promise<number> {
  await serviceDelay();
  await initializeDatabase();
  return removeUnreferencedFiles();
}

export async function collectGarbageInternal(): Promise<number> {
  await initializeDatabase();
  return removeUnreferencedFiles();
}
