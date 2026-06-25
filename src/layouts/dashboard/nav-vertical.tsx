import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Logo from 'src/components/logo';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import { usePathname } from 'src/routes/hooks';
import Scrollbar from 'src/components/scrollbar';
import { useAuthStore } from 'src/auth/auth-store';
import { useResponsive } from 'src/hooks/use-responsive';
import { NavSectionVertical } from 'src/components/nav-section';

import { NAV } from '../config-layout';
import { useNavData } from './config-navigation';

// ----------------------------------------------------------------------

type Props = {
  openNav: boolean;
  onCloseNav: VoidFunction;
};

export default function NavVertical({ openNav, onCloseNav }: Props) {
  const { user } = useAuthStore();

  const pathname = usePathname();

  const lgUp = useResponsive('up', 'lg');

  const navData = useNavData();

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box sx={{ width: 'fit-content', mx: 'auto', my: 4.5 }}>
        <Logo
          enableText
          sx={{ width: 100, height: 64, color: 'primary.contrastText' }}
          textProps={{ sx: { color: 'primary.contrastText' }, variant: 'h4', fontWeight: 500 }}
        />
      </Box>
      <NavSectionVertical
        data={navData}
        slotProps={{
          userModules: user?.modules,
        }}
      />
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_VERTICAL },
        backgroundColor: 'primary.main',
      }}
    >
      {lgUp ? (
        <Stack
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.W_VERTICAL,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Stack>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.W_VERTICAL,
              backgroundColor: (theme) => `${theme.palette.primary.main} !important`,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
