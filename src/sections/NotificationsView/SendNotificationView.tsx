"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useSnackbar } from "notistack";
import { endpoints } from "src/utils/endpoints";
import { postData } from "src/utils/crud-fetch-api";

import type { SendNotificationRequest } from "src/types/notifications";

import SendNotificationForm from "./SendNotificationForm";
import type { NotificationUserOption, SendNotificationPayload } from "./types";

type SendNotificationViewProps = {
  users: NotificationUserOption[];
};

export default function SendNotificationView({ users }: SendNotificationViewProps) {
  const t = useTranslations();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCancel = () => {
    router.push("/notifications");
  };

  const handleSubmit = async (payload: SendNotificationPayload) => {
    setIsSubmitting(true);

    try {
      const response = await postData<unknown, SendNotificationRequest>(
        endpoints.notifications.post,
        payload
      );

      if (response.success) {
        enqueueSnackbar(t("Pages.Notification.send_success"), { variant: "success" });
        router.push("/notifications");
        router.refresh();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SendNotificationForm
      users={users}
      isSubmitting={isSubmitting}
      onCancel={handleCancel}
      onSubmit={handleSubmit}
    />
  );
}
