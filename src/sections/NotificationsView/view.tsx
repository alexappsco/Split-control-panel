"use client";

import type { HeadCell } from "src/components/SimpleTable/types";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMemo, useState, useEffect } from "react";
import Iconify from "src/components/iconify";
import SimpleTable from "src/components/SimpleTable";
import { fDate } from "src/utils/format-time";
import { endpoints } from "src/utils/endpoints";
import { getData } from "src/utils/crud-fetch-api";
import type { AdminNotification } from "src/types/notifications";
import {
  Box,
  Card,
  Button,
  Select,
  MenuItem,
  Checkbox,
  TextField,
  Typography,
  FormControl,
  InputAdornment,
} from "@mui/material";

import NotificationDetailDialog from "./NotificationDetailDialog";
import { mapApiNotificationToRow, getUserNameById } from "./notifications-mapper";
import { scrollableSelectMenuProps } from "./select-menu-props";
import type {
  NotificationRow,
  NotificationsViewProps,
  NotificationStatusFilter,
} from "./types";

function truncateText(text: string, maxLength = 48) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

function createCheckboxColumn(
  selected: string[],
  onToggle: (id: string) => void,
  onToggleAll: (ids: string[]) => void,
  rowIds: string[]
): HeadCell<NotificationRow> {
  const allSelected = rowIds.length > 0 && rowIds.every((id) => selected.includes(id));
  const someSelected = rowIds.some((id) => selected.includes(id));

  return {
    id: "select",
    label: "",
    align: "center",
    width: 48,
    renderHeader: () => (
      <Checkbox
        size="small"
        checked={allSelected}
        indeterminate={someSelected && !allSelected}
        onChange={() => onToggleAll(allSelected ? [] : rowIds)}
      />
    ),
    renderCell: (row) => (
      <Checkbox
        size="small"
        checked={selected.includes(row.id)}
        onChange={() => onToggle(row.id)}
        onClick={(e) => e.stopPropagation()}
      />
    ),
  };
}

export default function NotificationsView({
  notifications: initialNotifications,
  users,
}: NotificationsViewProps) {
  const t = useTranslations();
  const router = useRouter();
  const [notifications, setNotifications] = useState<NotificationRow[]>(initialNotifications);
  const [statusFilter, setStatusFilter] = useState<NotificationStatusFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [detailNotification, setDetailNotification] = useState<NotificationRow | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    setNotifications(initialNotifications);
  }, [initialNotifications]);

  const resolveUserName = (userId: string) => getUserNameById(users, userId);

  const filteredData = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return notifications.filter((item) => {
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && item.isSuccess) ||
        (statusFilter === "inactive" && !item.isSuccess);

      const matchesSearch =
        !query ||
        item.titleAr.toLowerCase().includes(query) ||
        item.titleEn.toLowerCase().includes(query) ||
        item.bodyAr.toLowerCase().includes(query) ||
        item.bodyEn.toLowerCase().includes(query) ||
        resolveUserName(item.receiverUserId).toLowerCase().includes(query);

      const matchesUser = !userFilter || item.receiverUserId === userFilter;

      const matchesDate =
        !dateFilter || fDate(item.creationTime, "d/M/yyyy") === dateFilter;

      return matchesStatus && matchesSearch && matchesUser && matchesDate;
    });
  }, [notifications, statusFilter, searchQuery, userFilter, dateFilter, users]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = (ids: string[]) => {
    setSelectedIds(ids);
  };

  const handleViewDetail = async (row: NotificationRow) => {
    setDetailNotification(row);
    setDetailLoading(true);

    try {
      const response = await getData<AdminNotification>(
        endpoints.notifications.single(row.id)
      );

      if (response.success && response.data) {
        setDetailNotification(mapApiNotificationToRow(response.data));
      }
    } finally {
      setDetailLoading(false);
    }
  };

  const tableHead: HeadCell<NotificationRow>[] = [
    createCheckboxColumn(
      selectedIds,
      toggleSelect,
      toggleSelectAll,
      filteredData.map((row) => row.id)
    ),
    {
      id: "bodyAr",
      label: t("Pages.Notification.notification_ar"),
      align: "center",
      width: "24%",
      renderCell: (row) => (
        <Typography sx={{ fontSize: 14, color: "#111827", fontWeight: 500 }}>
          {truncateText(row.bodyAr)}
        </Typography>
      ),
    },
    {
      id: "bodyEn",
      label: t("Pages.Notification.notification_en"),
      align: "center",
      width: "24%",
      renderCell: (row) => (
        <Typography sx={{ fontSize: 14, color: "#4b5563" }}>
          {truncateText(row.bodyEn)}
        </Typography>
      ),
    },
    {
      id: "receiverUserId",
      label: t("Pages.Notification.user"),
      align: "center",
      width: "18%",
      renderCell: (row) => resolveUserName(row.receiverUserId),
    },
    {
      id: "creationTime",
      label: t("Pages.Notification.date"),
      align: "center",
      width: "14%",
      renderCell: (row) => fDate(row.creationTime, "d/M/yyyy"),
    },
  ];

  const actions = [
    {
      label: t("Global.Action.view"),
      icon: <Iconify icon="solar:eye-bold" />,
      onClick: (row: NotificationRow) => {
        void handleViewDetail(row);
      },
    },
  ];

  const dateOptions = useMemo(() => {
    const uniqueDates = Array.from(
      new Set(
        notifications.map((item) => fDate(item.creationTime, "d/M/yyyy"))
      )
    );

    return uniqueDates;
  }, [notifications]);

  return (
    <Box sx={{ textAlign: "right" }} dir="rtl">
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
          {t("Pages.Notification.page_title")}
        </Typography>

        <Button
          variant="contained"
          startIcon={<Iconify icon="flowbite:plus-outline" />}
          onClick={() => router.push("/notifications/send")}
          sx={{
            bgcolor: "#38A8AC",
            color: "#fff",
            borderRadius: "12px",
            fontWeight: 700,
            px: 2.5,
            height: 48,
            boxShadow: "0 8px 16px 0 rgba(56, 168, 172, 0.24)",
            "&:hover": { bgcolor: "#2F8D91" },
            textTransform: "none",
          }}
        >
          {t("Pages.Notification.send_notification_btn")}
        </Button>
      </Box>

      <Card
        sx={{
          borderRadius: "20px",
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)",
          border: "1px solid rgba(0,0,0,0.04)",
          overflow: "hidden",
        }}
      >
        <Box sx={{ p: 3, bgcolor: "#fff" }}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <TextField
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("Global.Label.search")}
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify
                        icon="solar:magnifer-linear"
                        sx={{ color: "text.disabled" }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                flex: 1,
                minWidth: 220,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                },
              }}
            />

            <FormControl size="small" sx={{ minWidth: 180 }}>
              <Select
                displayEmpty
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}
                MenuProps={scrollableSelectMenuProps}
                renderValue={(value) =>
                  value
                    ? users.find((user) => user.id === value)?.name ?? t("Pages.Notification.user")
                    : t("Pages.Notification.user")
                }
                startAdornment={
                  <InputAdornment position="start">
                    <Iconify icon="solar:user-linear" sx={{ color: "text.disabled" }} />
                  </InputAdornment>
                }
                sx={{
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                }}
              >
                <MenuItem value="">{t("Pages.Notification.all")}</MenuItem>
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 180 }}>
              <Select
                displayEmpty
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as NotificationStatusFilter)
                }
                renderValue={(value) => {
                  if (value === "active") return t("Global.Label.active");
                  if (value === "inactive") return t("Global.Label.inactive");
                  return t("Global.Label.status");
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <Iconify
                      icon="solar:check-circle-linear"
                      sx={{ color: "text.disabled" }}
                    />
                  </InputAdornment>
                }
                sx={{
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                }}
              >
                <MenuItem value="all">{t("Pages.Notification.all")}</MenuItem>
                <MenuItem value="active">{t("Global.Label.active")}</MenuItem>
                <MenuItem value="inactive">{t("Global.Label.inactive")}</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 180 }}>
              <Select
                displayEmpty
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                MenuProps={scrollableSelectMenuProps}
                renderValue={(value) => value || t("Pages.Notification.date")}
                startAdornment={
                  <InputAdornment position="start">
                    <Iconify
                      icon="solar:calendar-linear"
                      sx={{ color: "text.disabled" }}
                    />
                  </InputAdornment>
                }
                sx={{
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                }}
              >
                <MenuItem value="">{t("Pages.Notification.all")}</MenuItem>
                {dateOptions.map((date) => (
                  <MenuItem key={date} value={date}>
                    {date}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <SimpleTable<NotificationRow>
          data={filteredData}
          headCells={tableHead}
          actions={actions}
          actionsHeaderLabel=""
        />
      </Card>

      <NotificationDetailDialog
        open={Boolean(detailNotification)}
        notification={detailNotification}
        userName={
          detailNotification
            ? resolveUserName(detailNotification.receiverUserId)
            : ''
        }
        loading={detailLoading}
        onClose={() => setDetailNotification(null)}
      />
    </Box>
  );
}
