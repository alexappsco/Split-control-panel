'use client';

import * as yup from 'yup';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import YupPassword from 'yup-password';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { paths } from 'src/routes/paths';
import { ICONS } from 'src/config-icons';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { useBoolean } from 'src/hooks/use-boolean';
import { RouterLink } from 'src/routes/components';
import { useAuthStore } from 'src/auth/auth-store';
import { PATH_AFTER_LOGIN } from 'src/config-global';
import { yupResolver } from '@hookform/resolvers/yup';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter, useSearchParams } from 'src/routes/hooks';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

import { EMAIL_REGEX } from './config-auth';

YupPassword(yup);
// ----------------------------------------------------------------------

export default function LoginView() {
  const t = useTranslations();
  const { login } = useAuthStore();

  const LABELS = {
    email: t('Global.Label.email'),
    password: t('Global.Label.password'),
  };

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const showPassword = useBoolean();

  const LoginSchema = yup.object().shape({
    email: yup
      .string()
      .required(t('Global.Validation.var_required', { var: LABELS.email }))
      .matches(EMAIL_REGEX, t('Global.Validation.var_invalid', { var: LABELS.email })),
    password: yup
      .string()
      .min(8, t('Global.Validation.var_min', { var: LABELS.password, min: 8 }))
      .minLowercase(1, t('Global.Validation.var_min_lowercase', { var: LABELS.password, min: 1 }))
      .minUppercase(1, t('Global.Validation.var_min_uppercase', { var: LABELS.password, min: 1 }))
      .minNumbers(1, t('Global.Validation.var_min_number', { var: LABELS.password, min: 1 }))
      .minSymbols(1, t('Global.Validation.var_min_special', { var: LABELS.password, min: 1 }))
      .required(t('Global.Validation.var_required', { var: LABELS.password })),
  });

  const defaultValues = {
    email: 'admin@rassi.com',
    password: 'Admin@12345',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const res = await login?.(data);
    if (typeof res === 'object' && 'error' in res) {
      reset();
      setErrorMsg(res.error);
    } else {
      router.push(returnTo || PATH_AFTER_LOGIN);
    }
  });

  const renderHead = (
    <Typography
      variant="h3"
      textTransform="capitalize"
      textAlign="center"
      color="primary.contrastText"
    >
      {t('Pages.Auth.login_title')}
    </Typography>
  );

  const renderForm = (
    <Stack spacing={5} sx={{ minWidth: '100%' }}>
      {renderHead}

      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <RHFTextField
        name="email"
        label={LABELS.email}
        variant="filled"
        color="primary"
        formLabelProps={{
          sx: {
            color: 'white',
          },
        }}
      />

      <Box>
        <RHFTextField
          name="password"
          label={LABELS.password}
          type={showPassword.value ? 'text' : 'password'}
          variant="filled"
          color="primary"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={showPassword.onToggle} edge="end">
                    {showPassword.value ? ICONS.global.eyeClosed : ICONS.global.eye}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          formLabelProps={{
            sx: {
              color: 'white',
            },
          }}
        />
        <Link
          href={paths.auth.forgotPassword}
          component={RouterLink}
          color="primary.light"
          variant="caption"
          paddingInlineStart={2}
          display="inline-block"
        >
          {t('Pages.Auth.forgot_password')}
        </Link>
      </Box>

      <LoadingButton
        fullWidth
        color="primary"
        size="large"
        type="submit"
        variant="soft"
        loading={isSubmitting}
        sx={{ mt: -1 }}
      >
        {t('Pages.Auth.login_submit')}
      </LoadingButton>
    </Stack>
  );

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '440px',
        marginInline: 'auto',
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </FormProvider>
    </Box>
  );
}
