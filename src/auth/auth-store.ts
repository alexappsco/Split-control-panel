import { create } from 'zustand';
import { Profile } from 'src/types/prof';

import { login, refreshSession } from './auth-actions';
import { saveSession, removeSession, restoreSession } from './auth-utils';

type AuthStore = {
  loading: boolean;
  authenticated: boolean;
  user: any | null;
  login: (credentials: { email: string; password: string }) => Promise<void | { error: string }>;
  verifyOtp: (otp: string) => Promise<void | { error: string }>;
  init: () => Promise<void | { accessTokenExp: number }>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => void;
};

export const useAuthStore = create<AuthStore>()((set, get) => ({
  loading: true,
  authenticated: false,
  user: null,

   login: async ({ email, password }) => {
    try {
      const credentials = {
        email,
        password,
      };

      const { user, accessToken, refreshToken } = await login(credentials);

      await saveSession({ user, accessToken, refreshToken });

      set({ authenticated: true, user });
    } catch (error) {
      return {
        error: error.message,
      };
    }
  },
  verifyOtp: async (otp) => {
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (otp === '1234') {
            resolve({});
          } else {
            reject(new Error('Invalid OTP'));
          }
        }, 500);
      });
    } catch (error) {
      return {
        error: error.message,
      };
    }
  },

init: async () => {
    const errorFunc = async () => {
      await removeSession();
      set({ loading: false });
    };

    const refreshToken = await restoreSession();
    if (refreshToken) {
      try {
        const { user, accessToken, refreshToken } = await refreshSession();

        await saveSession({ user, accessToken, refreshToken });
        set({ loading: false, authenticated: true, user });
        return {
          accessTokenExp: new Date(accessToken.expire).getTime() - new Date().getTime() - 60 * 1000,
        };
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        errorFunc();
      }
    } else {
      errorFunc();
    }
  },

 
 logout: async () => {
    const { user } = get();
    // Clean up temporary image URLs using image property
    if (user?.image?.startsWith('blob:')) {
      URL.revokeObjectURL(user.image);
    }
    
    await removeSession();
    set({ authenticated: false, user: null, loading: false });
  },
  updateProfile: (updates) => {
    set((state) => {
      if (!state.user) return state;
      
      // Handle image cleanup
      const currentImage = state.user.image;
      const newImage = updates.image;
      
      // Revoke old temporary URL if being replaced
      if (currentImage?.startsWith('blob:') && currentImage !== newImage) {
        URL.revokeObjectURL(currentImage);
      }
      
      return {
        user: {
          ...state.user,
          ...updates,
          image: newImage || currentImage,
        }
      };
    });
  },
  //  updateProfile: (updates) => 
  //   set((state) => ({
  //     user: state.user ? { ...state.user, ...updates } : null
  //   })),
}));