export const USER = 'user';
export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';

type SessionCookieOptions = {
  httpOnly: true;
  secure: boolean;
  sameSite: 'lax';
  path: '/';
  expires?: Date;
};

function isSecureCookieEnvironment(): boolean {
  if (process.env.COOKIE_SECURE === 'true') return true;
  if (process.env.COOKIE_SECURE === 'false') return false;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? process.env.APP_URL ?? '';
  return appUrl.startsWith('https://');
}

function parseCookieExpires(expires?: Date | string): Date | undefined {
  if (!expires) return undefined;

  const date = new Date(expires);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export function getSessionCookieOptions(expires?: Date | string): SessionCookieOptions {
  const parsedExpires = parseCookieExpires(expires);

  return {
    httpOnly: true,
    secure: isSecureCookieEnvironment(),
    sameSite: 'lax',
    path: '/',
    ...(parsedExpires ? { expires: parsedExpires } : {}),
  };
}
