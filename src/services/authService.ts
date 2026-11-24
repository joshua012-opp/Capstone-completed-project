import type { CurrentUser, UserSession } from '../types/serenia';
import { serviceDelay } from './delay';
import { initializeDatabase, readCollection, updateCollections } from './storage';

const DEMO_USER: CurrentUser = {
  id: 'harrison-wells',
  name: 'Harrison Wells',
  email: 'harrison.wells@serenia.com',
};
const DEMO_PASSWORD = 'Serenia123!';

export async function login(email: string, password: string): Promise<CurrentUser> {
  await serviceDelay();
  await initializeDatabase();
  // Replace this hardcoded comparison and localStorage write with the authentication API.
  if (email.trim().toLowerCase() !== DEMO_USER.email || password !== DEMO_PASSWORD) {
    throw new Error('Email or password is incorrect.');
  }
  const session: UserSession = { userId: DEMO_USER.id, createdAt: new Date().toISOString() };
  updateCollections({ session });
  return DEMO_USER;
}

export async function logout(): Promise<void> {
  await serviceDelay();
  await initializeDatabase();
  // Replace this localStorage removal with the authentication API logout call.
  updateCollections({ session: null });
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  await serviceDelay();
  await initializeDatabase();
  // Replace this localStorage lookup with the current-user API fetch.
  const session = readCollection('session');
  return session?.userId === DEMO_USER.id ? DEMO_USER : null;
}

export const demoLogin = { email: DEMO_USER.email, password: DEMO_PASSWORD };
