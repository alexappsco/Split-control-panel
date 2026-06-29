"use client";

import { useTranslations } from "next-intl";
import {
  Box,
  Dialog,
  TextField,
  Typography,
  DialogContent,
  CircularProgress,
} from "@mui/material";

import CloseButton from "src/components/dialog/CloseButton";

import type { NotificationRow } from "./types";

type NotificationDetailDialogProps = {
  open: boolean;
  notification: NotificationRow | null;
  userName: string;
  loading?: boolean;
  onClose: () => void;
};

export default function NotificationDetailDialog({
  open,
  notification,
  userName,
  loading = false,
  onClose,
}: NotificationDetailDialogProps) {
  const t = useTranslations();

  if (!notification) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "20px",
          p: 1,
        },
      }}
    >
      <CloseButton onClose={onClose} />
      <DialogContent sx={{ pt: 5, pb: 3, px: 3 }}>
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 700,
            color: "#111827",
            mb: 3,
            textAlign: "right",
          }}
        >
          {notification.titleEn} - {notification.titleAr}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <Box>
            <Typography
              sx={{ fontSize: 14, fontWeight: 600, color: "#374151", mb: 1 }}
            >
              {t("Pages.Notification.content_ar")}
            </Typography>
            <TextField
              fullWidth
              multiline
              minRows={3}
              value={notification.bodyAr}
              slotProps={{ input: { readOnly: true } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "#f9fafb",
                },
              }}
            />
          </Box>

          <Box>
            <Typography
              sx={{ fontSize: 14, fontWeight: 600, color: "#374151", mb: 1 }}
            >
              {t("Pages.Notification.content_en")}
            </Typography>
            <TextField
              fullWidth
              multiline
              minRows={3}
              value={notification.bodyEn}
              slotProps={{ input: { readOnly: true } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "#f9fafb",
                },
              }}
            />
          </Box>
        </Box>

        <Typography
          sx={{
            mt: 3,
            fontSize: 14,
            fontWeight: 600,
            color: "#6b7280",
            textAlign: "right",
          }}
        >
          {t("Pages.Notification.user_label", { name: userName })}
        </Typography>

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
