"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Box,
  Card,
  Button,
  Select,
  Switch,
  MenuItem,
  Checkbox,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  ListItemText,
  FormControlLabel,
} from "@mui/material";

import type {
  NotificationUserOption,
  SendNotificationPayload,
} from "./types";
import { scrollableSelectMenuProps } from "./select-menu-props";

type SendNotificationFormProps = {
  users: NotificationUserOption[];
  isSubmitting?: boolean;
  onCancel: () => void;
  onSubmit: (payload: SendNotificationPayload) => void | Promise<void>;
};

const initialForm: SendNotificationPayload = {
  titleAr: "",
  titleEn: "",
  bodyAr: "",
  bodyEn: "",
  sendToAll: false,
  userIds: [],
};

export default function SendNotificationForm({
  users,
  isSubmitting = false,
  onCancel,
  onSubmit,
}: SendNotificationFormProps) {
  const t = useTranslations();
  const [form, setForm] = useState<SendNotificationPayload>(initialForm);

  const handleChange = (
    field: "titleAr" | "titleEn" | "bodyAr" | "bodyEn",
    value: string
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSendToAllToggle = (checked: boolean) => {
    setForm((current) => ({
      ...current,
      sendToAll: checked,
      userIds: checked ? [] : current.userIds,
    }));
  };

  const handleUsersChange = (userIds: string[]) => {
    setForm((current) => ({ ...current, userIds }));
  };

  const handleSubmit = async () => {
    await onSubmit(form);
  };

  const canSubmit =
    !isSubmitting &&
    (form.sendToAll || form.userIds.length > 0);

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      backgroundColor: "#f9fafb",
    },
  };

  const selectedUserNames = form.userIds
    .map((id) => users.find((user) => user.id === id)?.name)
    .filter(Boolean) as string[];

  return (
    <Box dir="rtl">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#111827" }}>
          {t("Pages.Notification.send_notification_btn")}
        </Typography>
      </Box>

      <Card
        sx={{
          borderRadius: "20px",
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)",
          border: "1px solid rgba(0,0,0,0.04)",
          p: 3,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
          }}
        >
          <Box>
            <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#374151", mb: 1 }}>
              {t("Pages.Notification.ar_title_notification")}
            </Typography>
            <TextField
              fullWidth
              placeholder={t("Pages.Notification.title_placeholder_ar")}
              value={form.titleAr}
              onChange={(e) => handleChange("titleAr", e.target.value)}
              sx={fieldSx}
            />
          </Box>

          <Box>
            <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#374151", mb: 1 }}>
              {t("Pages.Notification.eng_title_notification")}
            </Typography>
            <TextField
              fullWidth
              placeholder={t("Pages.Notification.title_placeholder_en")}
              value={form.titleEn}
              onChange={(e) => handleChange("titleEn", e.target.value)}
              sx={fieldSx}
            />
          </Box>

          <Box>
            <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#374151", mb: 1 }}>
              {t("Pages.Notification.ar_content")}
            </Typography>
            <TextField
              fullWidth
              multiline
              minRows={5}
              placeholder={t("Pages.Notification.body_placeholder_ar")}
              value={form.bodyAr}
              onChange={(e) => handleChange("bodyAr", e.target.value)}
              sx={fieldSx}
            />
          </Box>

          <Box>
            <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#374151", mb: 1 }}>
              {t("Pages.Notification.eng_content")}
            </Typography>
            <TextField
              fullWidth
              multiline
              minRows={5}
              placeholder={t("Pages.Notification.body_placeholder_en")}
              value={form.bodyEn}
              onChange={(e) => handleChange("bodyEn", e.target.value)}
              sx={fieldSx}
            />
          </Box>

          <Box sx={{ gridColumn: { xs: "1", md: "1 / -1" } }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                mb: 1.5,
                flexWrap: "wrap",
              }}
            >
              <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>
                {t("Pages.Notification.users_label")}
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={form.sendToAll}
                    onChange={(e) => handleSendToAllToggle(e.target.checked)}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#38A8AC",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                        backgroundColor: "#38A8AC",
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>
                    {t("Pages.Notification.send_to_all")}
                  </Typography>
                }
                sx={{ mr: 0 }}
              />
            </Box>

            <FormControl fullWidth disabled={form.sendToAll}>
              <InputLabel id="send-notification-users-label">
                {t("Pages.Notification.select_users")}
              </InputLabel>
              <Select
                labelId="send-notification-users-label"
                label={t("Pages.Notification.select_users")}
                multiple
                value={form.userIds}
                onChange={(e) => {
                  const value = e.target.value;
                  handleUsersChange(
                    typeof value === "string" ? value.split(",") : value
                  );
                }}
                MenuProps={scrollableSelectMenuProps}
                renderValue={() => {
                  if (form.sendToAll) {
                    return t("Pages.Notification.all_users_selected");
                  }

                  if (selectedUserNames.length === 0) {
                    return t("Pages.Notification.select_users");
                  }

                  if (selectedUserNames.length <= 2) {
                    return selectedUserNames.join(" ، ");
                  }

                  return t("Pages.Notification.selected_users_count", {
                    count: selectedUserNames.length,
                  });
                }}
                sx={{
                  borderRadius: "12px",
                  backgroundColor: form.sendToAll ? "#f3f4f6" : "#f9fafb",
                }}
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    <Checkbox checked={form.userIds.includes(user.id)} />
                    <ListItemText primary={user.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {form.sendToAll && (
              <Typography sx={{ mt: 1, fontSize: 13, color: "#6b7280" }}>
                {t("Pages.Notification.send_to_all_hint")}
              </Typography>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            gap: 2,
            mt: 4,
          }}
        >
          <Button
            variant="contained"
            onClick={() => void handleSubmit()}
            disabled={!canSubmit}
            sx={{
              bgcolor: "#38A8AC",
              color: "#fff",
              borderRadius: "12px",
              fontWeight: 700,
              px: 4,
              height: 44,
              textTransform: "none",
              "&:hover": { bgcolor: "#2F8D91" },
            }}
          >
            {t("Global.Action.add")}
          </Button>
          <Button
            variant="outlined"
            onClick={onCancel}
            sx={{
              borderRadius: "12px",
              fontWeight: 700,
              px: 4,
              height: 44,
              textTransform: "none",
              borderColor: "#38A8AC",
              color: "#38A8AC",
            }}
          >
            {t("Global.Action.cancel")}
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
