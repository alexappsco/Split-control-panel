"use client";

import type { HeadCell } from "src/components/SimpleTable/types";

import { useRouter } from "next/navigation";
import Iconify from "src/components/iconify";
import { endpoints } from "src/utils/endpoints";
import { editData } from "src/utils/crud-fetch-api";
import { useMemo, useState, useEffect } from "react";
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

type StatusFilter = "all" | "active" | "inactive" | "blocked";

type UsersRow = {
  id: string;
  name: string;
  profileImage: string | null;
  email: string;
  phoneNumber: string;
  spacesCount: number;
  isActive: boolean;
  phoneNumberConfirmed: boolean;
};

type UsersViewProps = {
  users: UsersRow[];
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

export default function UsersView({ users: initialUsers }: UsersViewProps) {
  const router = useRouter();
  const [users, setUsers] = useState<UsersRow[]>(initialUsers);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UsersRow | null>(null);

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  const activeCount = users.filter((user) => user.isActive).length;
  const inactiveCount = users.filter((user) => !user.isActive).length;
  const blockedCount = 0;

  const filteredData = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return users.filter((user) => {
      const userStatus: StatusFilter = user.isActive ? "active" : "inactive";
      const matchesTab = statusFilter === "all" || userStatus === statusFilter;
      const matchesSearch =
        !query ||
        user.name.toLowerCase().includes(query) ||
        user.phoneNumber.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query);

      return matchesTab && matchesSearch;
    });
  }, [users, statusFilter, searchQuery]);

  const tabs = [
    {
      label: "الكل",
      value: "all" as const,
      count: users.length,
      bgColor: "#1f2937",
      textColor: "#fff",
    },
    {
      label: "مفعل",
      value: "active" as const,
      count: activeCount,
      bgColor: "#d1fae5",
      textColor: "#059669",
    },
    {
      label: "معطل",
      value: "inactive" as const,
      count: inactiveCount,
      bgColor: "#f3f4f6",
      textColor: "#6b7280",
    },
    {
      label: "محظور",
      value: "blocked" as const,
      count: blockedCount,
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
    try {
      await editData<any, { isActive: boolean }>(
        endpoints.users.update(id),
        "PUT",
        { isActive: newStatus }
      );
      setUsers((current) =>
        current.map((u) => (u.id === id ? { ...u, isActive: newStatus } : u))
      );
    } catch (ignore) {
      // console.error("Failed to update user status", error);
    }
  };

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      setUsers((current) => current.filter((user) => user.id !== userToDelete.id));
    }
    setOpenDeleteDialog(false);
    setUserToDelete(null);
  };

  const tableHead: HeadCell<UsersRow>[] = [
    createCheckboxColumn(
      selectedIds,
      toggleSelect,
      toggleSelectAll,
      filteredData.map((row) => row.id)
    ),
    {
      id: "name",
      label: "الاسم",
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
            {row.name.charAt(0)}
          </Avatar>
          <Typography sx={{ fontWeight: 600, fontSize: 15, color: "#111827" }}>
            {row.name}
          </Typography>
        </Box>
      ),
    },
    { id: "phoneNumber", label: "رقم الهاتف", align: "center", width: "22%" },
    { id: "spacesCount", label: "عدد المجموعات", align: "center", width: "16%" },
    {
      id: "status",
      label: "الحالة",
      align: "center",
      width: "18%",
      renderCell: (row) => {
        const active = row.isActive;

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
              {active ? "مفعل" : "معطل"}
            </Typography>
            <Switch
              size="small"
              checked={active}
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
      label: "عرض",
      icon: <Iconify icon="solar:eye-bold" />,
      onClick: (row: UsersRow) => {
        router.push(`/users/${row.id}`);
      },
    },
    {
      label: "حذف",
      icon: <Iconify icon="solar:trash-bin-trash-bold" />,
      sx: { color: "error.main" },
      onClick: (row: UsersRow) => {
        setUserToDelete(row);
        setOpenDeleteDialog(true);
      },
    },
  ];

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
          إدارة المستخدمين
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
          إضافة
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
                onClick={() => setStatusFilter(tab.value)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  pb: 1,
                  px: 0,
                  color: statusFilter === tab.value ? "#111827" : "#6b7280",
                  fontWeight: 600,
                  textTransform: "none",
                  fontSize: "0.95rem",
                  borderBottom:
                    statusFilter === tab.value ? "2px solid #111827" : "none",
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث..."
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
          data={filteredData}
          headCells={tableHead}
          actions={actions}
        />
      </Card>

      <DeleteDialog
        open={openDeleteDialog}
        onClose={() => {
          setOpenDeleteDialog(false);
          setUserToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
}
