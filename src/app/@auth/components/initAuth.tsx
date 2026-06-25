'use client';

import { useEffect } from 'react';
import { useAuthStore } from 'src/auth/auth-store';

export default function InitAuth() {
  const { init, authenticated } = useAuthStore();

  useEffect(() => {
    if (!authenticated) {
      const handleRefreshToekn = async () => {
        const { accessTokenExp } = (await init()) || {};
        if (accessTokenExp) {
          setTimeout(() => {
            handleRefreshToekn();
          }, accessTokenExp);
        }
      };

      handleRefreshToekn();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
