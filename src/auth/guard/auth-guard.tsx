import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useState, useEffect, useCallback } from 'react';
import { SplashScreen } from 'src/components/loading-screen';

import { useAuthStore } from '../auth-store';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const { loading } = useAuthStore();

  return <>{loading ? <SplashScreen /> : <Container>{children}</Container>}</>;
}

// ----------------------------------------------------------------------

function Container({ children }: Props) {
  const router = useRouter();

  const { authenticated } = useAuthStore();

  const [checked, setChecked] = useState(false);
  const check = useCallback(() => {
    if (!authenticated) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();

      const href = `${paths.auth.login}?${searchParams}`;

      router.replace(href);
    } else {
      setChecked(true);
    }
  }, [authenticated, router]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
