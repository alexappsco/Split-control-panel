import { paths } from 'src/routes/paths';
import { useEffect, useCallback } from 'react';
import { SplashScreen } from 'src/components/loading-screen';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useAuthStore } from '../auth-store';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: Props) {
  const { loading } = useAuthStore();

  return <>{loading ? <SplashScreen /> : <Container>{children}</Container>}</>;
}

// ----------------------------------------------------------------------

function Container({ children }: Props) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo') || paths.controlPanel.main;

  const { authenticated } = useAuthStore();

  const check = useCallback(() => {
    if (authenticated) {
      router.replace(returnTo);
    }
  }, [authenticated, returnTo, router]);

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}
