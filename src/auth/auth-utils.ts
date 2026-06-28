'use server';

import { cookies } from 'next/headers';

import { UserSession } from './types';
import { USER, ACCESS_TOKEN, REFRESH_TOKEN, getSessionCookieOptions } from './config';

export async function saveSession({ user, accessToken, refreshToken }: UserSession) {
  const cookiesStore = await cookies();
  const tokenCookieOptions = getSessionCookieOptions(refreshToken.expire);

  cookiesStore.set(ACCESS_TOKEN, accessToken.value, tokenCookieOptions);
  cookiesStore.set(REFRESH_TOKEN, refreshToken.value, tokenCookieOptions);
  cookiesStore.set(USER, JSON.stringify(user), getSessionCookieOptions(refreshToken.expire));
}

export async function removeSession() {
  const cookiesStore = await cookies();
  const deleteOptions = { path: '/' as const };

  cookiesStore.delete({ name: ACCESS_TOKEN, ...deleteOptions });
  cookiesStore.delete({ name: REFRESH_TOKEN, ...deleteOptions });
  cookiesStore.delete({ name: USER, ...deleteOptions });
}

export async function restoreSession() {
  const cookiesStore = await cookies();

  const refreshToken = cookiesStore.get(REFRESH_TOKEN);

  return refreshToken || null;
}
