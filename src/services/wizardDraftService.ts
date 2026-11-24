import { serviceDelay } from './delay';
import { initializeDatabase, readCollection, updateCollections } from './storage';
import type { ClusterWizardPayload, WizardAutosave, WizardPosition } from '../types/serenia';

export async function saveAutosave(
  data: ClusterWizardPayload,
  position: WizardPosition,
  clusterId: string | null = null,
): Promise<WizardAutosave> {
  await serviceDelay();
  await initializeDatabase();
  // Replace this localStorage write with the wizard autosave API when the backend is available.
  const autosave: WizardAutosave = {
    clusterId,
    data,
    position,
    savedAt: new Date().toISOString(),
  };
  updateCollections({ wizardAutosave: autosave });
  return autosave;
}

export async function getAutosave(): Promise<WizardAutosave | null> {
  await serviceDelay();
  await initializeDatabase();
  // Replace this localStorage read with the wizard autosave API when the backend is available.
  return readCollection('wizardAutosave');
}

export async function clearAutosave(): Promise<void> {
  await serviceDelay();
  await initializeDatabase();
  // Replace this localStorage removal with the wizard autosave API when the backend is available.
  updateCollections({ wizardAutosave: null });
}
