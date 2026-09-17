"use client";

import type { HeadCell } from "src/components/SimpleTable/types";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useSnackbar } from "src/components/snackbar";
import Iconify from "src/components/iconify";
import { endpoints } from "src/utils/endpoints";
import { editData, deleteData } from "src/utils/crud-fetch-api";
import { useQuery } from "src/components/use-query";
import { useMemo, useState, useEffect, useTransition } from "react";
import SimpleTable from "src/components/SimpleTable";
import DeleteDialog from "src/components/dialog/delete";
import {
  Box,
  Card,
  Avatar,
  Button,
  Switch,
  Checkbox,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";

import {
  getUsersPage,
  type UsersQueryParams,
  type UserStatusFilter,
} from "./users-params";

export type UsersRow = {
  id: string;
  name: string;
  profileImage: string | null;
  email: string;
  phoneNumber: string;
  spacesCount: number;
  isActive: boolean;
  phoneNumberConfirmed?: boolean;
};

type UsersCounts = {
  all: number;
  active: number;
  inactive: number;
  blocked: number;
};

type UsersViewProps = {
  users: UsersRow[];
  totalCount: number;
  counts: UsersCounts;
  params: UsersQueryParams;
};

function createCheckboxColumn(
  selected: string[],
  onToggle: (id: string) => void,
  onToggleAll: (ids: string[]) => void,
  rowIds: string[]
): HeadCell<UsersRow> {
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

const QUERY_KEYS = ["SearchTerm", "status", "SkipCount", "MaxResultCount", "Sorting"];

export default function UsersView({
  users: initialUsers,
  totalCount,
  counts,
  params,
}: UsersViewProps) {
  const t = useTranslations();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { changeQueries } = useQuery(QUERY_KEYS, true);
  const [isPending, startTransition] = useTransition();

  const [users, setUsers] = useState<UsersRow[]>(initialUsers);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UsersRow | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [statusUpdatingId, setStatusUpdatingId] = useState<string | null>(null);

  const [searchInput, setSearchInput] = useState(params.SearchTerm);

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  useEffect(() => {
    setSearchInput(params.SearchTerm);
  }, [params.SearchTerm]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput === params.SearchTerm) return;
      startTransition(() => {
        changeQueries({
          SearchTerm: searchInput.trim() || null,
          SkipCount: "0",
        });
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput, params.SearchTerm, changeQueries]);

  const handleTabChange = (newStatus: UserStatusFilter) => {
    if (params.status === newStatus) return;
    startTransition(() => {
      changeQueries({
        status: newStatus === "all" ? null : newStatus,
        SkipCount: "0",
      });
    });
  };

  const tabs = [
    {
      label: t("Pages.Users.all"),
      value: "all" as const,
      count: counts.all,
      bgColor: "#1f2937",
      textColor: "#fff",
    },
    {
      label: t("Pages.Users.active"),
      value: "active" as const,
      count: counts.active,
      bgColor: "#d1fae5",
      textColor: "#059669",
    },
    {
      label: t("Pages.Users.inactive"),
      value: "inactive" as const,
      count: counts.inactive,
      bgColor: "#f3f4f6",
      textColor: "#6b7280",
    },
    {
      label: t("Pages.Users.blocked"),
      value: "blocked" as const,
      count: counts.blocked,
      bgColor: "#fee2e2",
      textColor: "#dc2626",
    },
  ];

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = (ids: string[]) => {
    setSelectedIds(ids);
  };

  const handleStatusToggle = async (id: string) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;
    const newStatus = !user.isActive;

    setStatusUpdatingId(id);
    try {
      const response = await editData<any, { isActive: boolean }>(
        endpoints.users.update(id),
        "PUT",
        { isActive: newStatus }
      );

      if (response.success) {
        enqueueSnackbar(
          t("Global.Server.Success.var_updated", { var: t("Global.Label.status") }),
          { variant: "success" }
        );
        setUsers((current) =>
          current.map((u) => (u.id === id ? { ...u, isActive: newStatus } : u))
        );
        router.refresh();
      } else {
        enqueueSnackbar(response.error || t("Global.Server.unexpected_error"), {
          variant: "error",
        });
      }
    } catch (err: any) {
      enqueueSnackbar(err?.message || t("Global.Server.unexpected_error"), {
        variant: "error",
      });
    } finally {
      setStatusUpdatingId(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;
    setIsDeleting(true);

    try {
      const response = await deleteData(endpoints.users.single(userToDelete.id));

      if (response.success) {
        enqueueSnackbar(
          t("Global.Server.Success.var_deleted", {
            var: userToDelete.name || t("Pages.Users.name"),
          }),
          { variant: "success" }
        );
        setUsers((current) => current.filter((u) => u.id !== userToDelete.id));
        setOpenDeleteDialog(false);
        setUserToDelete(null);
        router.refresh();
      } else {
        enqueueSnackbar(response.error || t("Global.Server.unexpected_error"), {
          variant: "error",
        });
      }
    } catch (err: any) {
      enqueueSnackbar(err?.message || t("Global.Server.unexpected_error"), {
        variant: "error",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteClose = () => {
    if (isDeleting) return;
    setOpenDeleteDialog(false);
    setUserToDelete(null);
  };

  const tableHead: HeadCell<UsersRow>[] = [
    createCheckboxColumn(
      selectedIds,
      toggleSelect,
      toggleSelectAll,
      users.map((row) => row.id)
    ),
    {
      id: "name",
      label: t("Pages.Users.name"),
      align: "center",
      width: "28%",
      renderCell: (row) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
          }}
        >
          <Avatar
            src={row.profileImage ?? undefined}
            sx={{ width: 40, height: 40, bgcolor: "#E5E7EB", color: "#6B7280" }}
          >
            {row.name ? row.name.charAt(0) : "U"}
          </Avatar>
          <Typography sx={{ fontWeight: 600, fontSize: 15, color: "#111827" }}>
            {row.name}
          </Typography>
        </Box>
      ),
    },
    { id: "phoneNumber", label: t("Pages.Users.phone_number"), align: "center", width: "22%" },
    { id: "spacesCount", label: t("Pages.Users.groups_count"), align: "center", width: "16%" },
    {
      id: "status",
      label: t("Global.Label.status"),
      align: "center",
      width: "18%",
      renderCell: (row) => {
        const active = row.isActive;
        const isUpdating = statusUpdatingId === row.id;

        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
                color: "#4b5563",
                whiteSpace: "nowrap",
              }}
            >
              {active ? t("Pages.Users.active") : t("Pages.Users.inactive")}
            </Typography>
            <Switch
              size="small"
              checked={active}
              disabled={isUpdating}
              onChange={() => handleStatusToggle(row.id)}
              sx={{
                "& .MuiSwitch-track": {
                  backgroundColor: active ? "#00A76F" : "#e5e7eb",
                  opacity: 1,
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#00A76F",
                  opacity: 1,
                },
              }}
            />
          </Box>
        );
      },
    },
  ];

  const actions = [
    {
      label: t("Global.Action.view"),
      icon: <Iconify icon="solar:eye-bold" />,
      onClick: (row: UsersRow) => {
        router.push(`/users/${row.id}`);
      },
    },
    {
      label: t("Global.Action.delete"),
      icon: <Iconify icon="solar:trash-bin-trash-bold" />,
      sx: { color: "error.main" },
      onClick: (row: UsersRow) => {
        setUserToDelete(row);
        setOpenDeleteDialog(true);
      },
    },
  ];

  const serverPagination = {
    count: totalCount,
    page: getUsersPage(params),
    rowsPerPage: params.MaxResultCount,
    onPageChange: (
      _event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number
    ) => {
      startTransition(() => {
        changeQueries({
          SkipCount: String(newPage * params.MaxResultCount),
        });
      });
    },
    onRowsPerPageChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      startTransition(() => {
        changeQueries({
          MaxResultCount: event.target.value,
          SkipCount: "0",
        });
      });
    },
  };

  return (
    <Box>
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
          {t("Pages.Users.title")}
        </Typography>

        <Button
          variant="contained"
          startIcon={<Iconify icon="flowbite:plus-outline" />}
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
          {t("Global.Action.add")}
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
              gap: 3,
              borderBottom: "1px solid #f3f4f6",
              pb: 2,
              overflowX: "auto",
            }}
          >
            {tabs.map((tab) => (
              <Button
                key={tab.value}
                onClick={() => handleTabChange(tab.value)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  pb: 1,
                  px: 0,
                  color: params.status === tab.value ? "#111827" : "#6b7280",
                  fontWeight: 600,
                  textTransform: "none",
                  fontSize: "0.95rem",
                  borderBottom:
                    params.status === tab.value ? "2px solid #111827" : "none",
                  borderRadius: 0,
                  mb: "-1px",
                  whiteSpace: "nowrap",
                  "&:hover": { backgroundColor: "transparent", color: "#38A8AC" },
                }}
              >
                <Box
                  sx={{
                    backgroundColor: tab.bgColor,
                    color: tab.textColor,
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: "6px",
                  }}
                >
                  {tab.count}
                </Box>
                {tab.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ pt: 3 }}>
            <TextField
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={t("Global.Label.search")}
              size="small"
              fullWidth
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
                maxWidth: 400,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                },
              }}
            />
          </Box>
        </Box>

        <SimpleTable<UsersRow>
          data={users}
          headCells={tableHead}
          actions={actions}
          loading={isPending}
          serverPagination={serverPagination}
        />
      </Card>

      <DeleteDialog
        open={openDeleteDialog}
        onClose={handleDeleteClose}
        onConfirm={handleDeleteConfirm}
        loading={isDeleting}
      />
    </Box>
  );
}
