'use client';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Dialog,
  Button,
  IconButton,
  Typography,
  DialogContent,
} from '@mui/material';
import { useTranslations } from 'next-intl';

type DeleteDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  title?: string;
  description?: string;
};

export default function DeleteDialog({
  open,
  onClose,
  onConfirm,
  loading = false,
  title,
  description,
}: DeleteDialogProps) {
  const t = useTranslations();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      PaperProps={{
        sx: {
          width: {
            xs: '92%',
            sm: '620px',
          },
          maxWidth: '620px',
          borderRadius: '28px',
          border: 'none',
          outline: 'none',
          backgroundImage: 'none',
          boxShadow: '0px 12px 35px rgba(0,0,0,.10)',
        },
      }}
    >
      <DialogContent
        sx={{
          p: {
            xs: '20px',
            sm: '28px',
          },
          position: 'relative',
        }}
      >
        <IconButton
          onClick={onClose}
          sx={(theme) => ({
            position: 'absolute',
            top: 18,
            ...(theme.direction === 'rtl' ? { left: 18 } : { right: 18 }),
            p: 0,
            color: '#4A63D3',
          })}
        >
          <CloseIcon
            sx={{
              fontSize: 20,
            }}
          />
        </IconButton>

        <Typography
          sx={{
            fontSize: '20px',
            fontWeight: 700,
            textAlign: 'start',
            color: '#101828',
            mb: 4,
          }}
        >
          {title ?? t('Global.Action.delete')}
        </Typography>

        <Typography
          sx={{
            fontSize: '18px',
            fontWeight: 600,
            textAlign: 'start',
            color: '#475467',
            mb: 6,
          }}
        >
          {description ?? (t('Global.Label.name_ar') === 'الاسم بالعربية' ? 'هل أنت متأكد من أنك تريد الحذف؟' : 'Are you sure you want to delete?')}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2,
          }}
        >
          <Button
            onClick={onConfirm}
            disabled={loading}
            disableElevation
            variant="contained"
            sx={{
              minWidth: '110px',
              height: '40px',
              borderRadius: '8px',
              background: '#FF6257',
              fontSize: '16px',
              fontWeight: 700,
              boxShadow: 'none',
              '&:hover': {
                background: '#FF554A',
                boxShadow: 'none',
              },
            }}
          >
            {t('Global.Action.delete')}
          </Button>

          <Button
            onClick={onClose}
            disabled={loading}
            sx={{
              minWidth: '110px',
              height: '40px',
              borderRadius: '8px',
              border: '2px solid #98A2B3',
              color: '#344054',
              fontSize: '16px',
              fontWeight: 700,
              '&:hover': {
                border: '2px solid #98A2B3',
              },
            }}
          >
            {t('Global.Action.cancel')}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}