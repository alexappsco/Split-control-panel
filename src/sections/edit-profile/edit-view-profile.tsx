'use client';
import * as yup from 'yup';
import React, { useEffect } from 'react';
import { Profile } from 'src/types/prof';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { endpoints } from 'src/utils/endpoints';
import { useAuthStore } from 'src/auth/auth-store';
import { editData } from 'src/utils/crud-fetch-api';
import { yupResolver } from '@hookform/resolvers/yup';
import { FetchTags } from 'src/actions/config-actions';
import { invalidateTag } from 'src/actions/cache-invalidation';
import FormProvider from 'src/components/hook-form/form-provider';
import RHFTextField from 'src/components/hook-form/rhf-text-field';
import { Box, Card, Grid2, Button, Typography } from '@mui/material';
import { RHFUploadAvatar } from 'src/components/hook-form/rhf-upload';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

interface Props {
  profile: Profile;
}

export default function EditViewProfile({ profile }: Props) {
  const t = useTranslations();
  const router = useRouter();
  const updateProfile = useAuthStore((state) => state.updateProfile);

  const labels = {
    profileImage: t('Global.Label.profile_image'),
    name: t('Global.Label.name'),
    email: t('Global.Label.email'),
    phoneNumber: t('Global.Label.phone'),
    currentPassword: t('Global.Label.current_password'),
    newPassword: t('Global.Label.new_password'),
    confirmNewPassword: t('Global.Label.confirm_new_password'),
    changePassword: t('Global.Label.change_password'),
    basicData: t('Global.Label.basic_data'),
  };
  
  const schema = yup.object().shape({
    name: yup.string().nullable(),
    email: yup
      .string()
      .email(t('Global.Validation.var_invalid', { var: labels.email }))
      .nullable(),
    phoneNumber: yup.string().nullable(),
    profileImage: yup.mixed().nullable(),
    currentPassword: yup.string().nullable(),
    newPassword: yup
      .string()
      .nullable()
      .test('password-strength', t('Global.Validation.password_validate'), (value) => {
        if (!value) return true; // allow empty
        return passwordRegex.test(value);
      }),
    confirmNewPassword: yup
      .string()
      .nullable()
      .oneOf([yup.ref('newPassword'), ''], t('Global.Validation.passwords_not_match')),
  });
  
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
      profileImage: null,
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name || '');
      setValue('email', profile.email || '');
      setValue('phoneNumber', profile.phoneNumber || '');
      setValue('profileImage', profile.image || '');
    }
  }, [profile, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    let newImageUrl: string | null = null;

    // Handle image upload
    if (data.profileImage instanceof File) {
      formData.append('Image', data.profileImage);
      newImageUrl = URL.createObjectURL(data.profileImage);
    }

    // Add other fields
    formData.append('Name', data.name || '');
    formData.append('Email', data.email || '');
    formData.append('PhoneNumber', data.phoneNumber || '');
    formData.append('CurrentPassword', data.currentPassword || '');
    formData.append('NewPassword', data.newPassword || '');

    try {
      const res = await editData(endpoints.auth.editProf, 'PUT', formData);

      if ('error' in res) {
        enqueueSnackbar(res.error || 'Error updating profile', { variant: 'error' });
      } else {
        // Fixed: Use 'image' property consistently
        updateProfile({
          name: data.name || '',
          email: data.email || '',
          phoneNumber: data.phoneNumber || '',
          image: newImageUrl || profile.avatar, // Use 'image' not 'avatar'
        });

        enqueueSnackbar(res.message, { variant: 'success' });
        
        // Clear password fields
        setValue('currentPassword', '');
        setValue('newPassword', '');
        setValue('confirmNewPassword', '');
        
        // Refresh data
        invalidateTag(FetchTags.UpdateProfile);
        router.refresh();
      }
    } catch (error: any) {
      enqueueSnackbar(error.message || 'An error occurred', { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid2 container spacing={3}>
        {/* Right - Basic Info */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
              {labels.basicData}
            </Typography>

            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <RHFUploadAvatar name="profileImage" />
            </Box>

            <RHFTextField name="name" label={labels.name} fullWidth sx={{ mb: 2 }} />
            <RHFTextField name="phoneNumber" label={labels.phoneNumber} fullWidth sx={{ mb: 2 }} />
            <RHFTextField name="email" label={labels.email} fullWidth sx={{ mb: 2 }} />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {t('Global.Label.save_data')}
            </Button>
          </Card>
        </Grid2>
        {/* Left - Password Change */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
              {labels.changePassword}
            </Typography>

            <RHFTextField
              name="currentPassword"
              label={labels.currentPassword}
              type="password"
              fullWidth
              sx={{ mb: 2 }}
            />
            <RHFTextField
              name="newPassword"
              label={labels.newPassword}
              type="password"
              fullWidth
              sx={{ mb: 2 }}
            />
            <RHFTextField
              name="confirmNewPassword"
              label={labels.confirmNewPassword}
              type="password"
              fullWidth
              sx={{ mb: 2 }}
            />
          </Card>
        </Grid2>
      </Grid2>
    </FormProvider>
  );
}