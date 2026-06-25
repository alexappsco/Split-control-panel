'use server';

import { cookies } from 'next/headers';
import axiosInstance from 'src/utils/axios';
import { endpoints } from 'src/utils/endpoints';

import { ACCESS_TOKEN, REFRESH_TOKEN } from './config';
import { User, UserSession, LoginCretentials } from './types';

export interface LoginRes extends User {
  accessToken: string;
  refreshToken: string;
  accessTokenExpireAt: Date;
  refreshTokenExpireAt: Date;
}

export async function login(credentials: LoginCretentials): Promise<UserSession> {
  try {
    const res = await axiosInstance.post(endpoints.auth.login, credentials);

    const { accessToken, refreshToken, accessTokenExpireAt, refreshTokenExpireAt, ...user } =
      res as unknown as LoginRes;
    return {
      user,
      accessToken: {
        value: accessToken,
        expire: accessTokenExpireAt,
      },
      refreshToken: {
        value: refreshToken,
        expire: refreshTokenExpireAt,
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function refreshSession(): Promise<UserSession> {
  try {
    const cookiesStore = await cookies();
    const refreshTokenCookie = cookiesStore.get(REFRESH_TOKEN);
    const accessTokenCookie = cookiesStore.get(ACCESS_TOKEN);

    if (!refreshTokenCookie?.value) {
      throw new Error('No refresh token found');
    }

    const res = await axiosInstance.post(
      endpoints.auth.refreshToken,
      {
        refreshToken: refreshTokenCookie.value,
      },
      {
        headers: {
          Authorization: `Bearer ${accessTokenCookie?.value}`,
        },
      }
    );

    const { accessToken, refreshToken, accessTokenExpireAt, refreshTokenExpireAt, ...user } =
      res as unknown as LoginRes;

    return {
      user,
      accessToken: {
        value: accessToken,
        expire: accessTokenExpireAt,
      },
      refreshToken: {
        value: refreshToken,
        expire: refreshTokenExpireAt,
      },
    };
  } catch (error) {
    throw error;
  }
}

export async function requestOtp(email: string): Promise<void> {
  try {
    await axiosInstance.post(endpoints.auth.sendOtp, { email, isPhone: false });
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function verifyOtp(email: string, otp: string): Promise<{ accessToken: string }> {
  try {
    const response = await axiosInstance.post(endpoints.auth.verifyOtp, {
      email,
      isPhone: false,
      otp,
    });
    return response as unknown as { accessToken: string };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function resetPassword({
  email,
  newPassword,
  confirmPassword,
  token,
}: {
  email: string;
  newPassword: string;
  confirmPassword: string;
  token: string;
}): Promise<void> {
  try {
    await axiosInstance.post(
      endpoints.auth.changePassword,
      { email, newPassword, confirmPassword, token },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
}
