'use server';

import { cookies } from 'next/headers';

import { UserSession } from './types';
import { USER, ACCESS_TOKEN, REFRESH_TOKEN } from './config';

export async function saveSession({ user, accessToken, refreshToken }: UserSession) {
  const cookiesStore = await cookies();

  cookiesStore.set(ACCESS_TOKEN, accessToken.value, {
    httpOnly: true,
    secure: true,
    expires: new Date(refreshToken.expire), // remove with Refresh Token because the old accessToken is needed to get new accessToken
  });
  cookiesStore.set(REFRESH_TOKEN, refreshToken.value, {
    httpOnly: true,
    secure: true,
    expires: new Date(refreshToken.expire),
  });
  cookiesStore.set(USER, JSON.stringify(user), { httpOnly: true, secure: true });
}

export async function removeSession() {
  const cookiesStore = await cookies();

  cookiesStore.delete(ACCESS_TOKEN);
  cookiesStore.delete(REFRESH_TOKEN);
  cookiesStore.delete(USER);
}

export async function restoreSession() {
  const cookiesStore = await cookies();

  const refreshToken = cookiesStore.get(REFRESH_TOKEN);

  return refreshToken || null;
}
