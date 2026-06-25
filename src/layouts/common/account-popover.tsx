'use client';
import { m } from 'framer-motion';
import { useSnackbar } from 'notistack';
import { paths } from 'src/routes/paths';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'src/routes/hooks';
import Iconify from 'src/components/iconify';
import { endpoints } from 'src/utils/endpoints';
import { useAuthStore } from 'src/auth/auth-store';
import { getData } from 'src/utils/crud-fetch-api';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { Stack, alpha, Avatar, Button, Divider, IconButton, Typography } from '@mui/material';

export default function AccountPopover() {
  const t = useTranslations('');
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const popover = usePopover();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchProfileImage = async () => {
      // try {
      setLoading(true);
      const profileData = await getData<any>(endpoints.auth.viewProf);
      if (profileData?.data?.image) {
        setProfileImage(profileData.data.image);
        // enqueueSnackbar(profileData.data.message, { variant: 'success' });
      } else {
        setLoading(false);
      }
    };

    fetchProfileImage();
  }, [profileImage, enqueueSnackbar]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  const handleEdit = () => {
    popover.onClose();
    router.push(paths.controlPanel.profile.viewProfileEdit);
  };

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(popover.open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={profileImage || user?.image}
          alt={user?.name}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {!loading && !profileImage && user?.name?.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        sx={{
          width: 250,
          p: 3,
          borderRadius: 3,
          boxShadow: 10,
          textAlign: 'center',
        }}
      >
        <Stack alignItems="center" spacing={1}>
          <Avatar
            src={profileImage || user?.image}
            alt={user?.name}
            sx={{ width: 80, height: 80 }}
          >
            {!loading && !profileImage && user?.name?.charAt(0).toUpperCase()}
          </Avatar>

          <Typography variant="subtitle1" noWrap>
            {user?.name || 'No Name'}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email || 'test@senwan.com'}
          </Typography>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={1}>
          <Button
            fullWidth
            variant="outlined"
            color="success"
            onClick={handleEdit}
            startIcon={<Iconify icon="eva:edit-2-fill" />}
            sx={{ justifyContent: 'center', fontWeight: 600 }}
          >
            {t('Pages.Notification.status.account_update')}
          </Button>

          <Button
            fullWidth
            variant="outlined"
            color="error"
            onClick={handleLogout}
            startIcon={<Iconify icon="solar:logout-2-bold-duotone" />}
            sx={{ justifyContent: 'center', fontWeight: 600 }}
          >
            {t('Pages.Notification.status.logout')}
          </Button>
        </Stack>
      </CustomPopover>
    </>
  );
}
