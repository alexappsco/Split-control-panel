"use client";

import { useMemo } from "react";
import {
  Box,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";
import Iconify from "src/components/iconify";
import SimpleTable from "src/components/SimpleTable";
import type { HeadCell } from "src/components/SimpleTable/types";
import type { ExpensesTabParams } from "../reports-params";
import {
  asRecord,
  createCheckboxColumn,
  filterFieldSx,
  searchFieldSx,
  StatusChip,
  useDebouncedSearch,
  useRowSelection,
  useTabQuery,
} from "./report-table-shared";
import type { GeneralExpense } from "../constants";
import { formatDate } from "date-fns";

type ExpensesReportTableProps = {
  params: ExpensesTabParams;
  items: unknown[];
  totalCount: number;
};

function mapExpenseStatus(status: unknown): GeneralExpense["status"] {
  const value = String(status ?? "").toLowerCase();
  if (value.includes("pending") || value.includes("معلق")) return "Pending";
  if (value.includes("approved") || value.includes("مكتمل")) return "Approved";
  if (value.includes("rejected") || value.includes("مرفوض")) return "Rejected";
  return "Completed";
}

function normalizeExpense(row: unknown, index: number): GeneralExpense {
  const data = asRecord(row);
  return {
    id: String(data.id ?? data.expenseId ?? index),
    date: String(data.date ?? data.createdAt ?? data.transactionDate ?? ""),
    space: String(data.space ?? data.spaceName ?? ""),
    user: String(data.user ?? data.userName ?? data.employeeName ?? ""),
    category: String(data.category ?? data.categoryName ?? ""),
    amount: String(data.amount ?? data.value ?? ""),
    status: mapExpenseStatus(data.status),
  };
}

const STATUS_OPTIONS = [
  { value: "", label: "الحالة" },
  { value: "Pending", label: "معلق" },
  { value: "Approved", label: "مكتمل" },
  { value: "Rejected", label: "مرفوض" },
];

export default function ExpensesReportTable({
  params,
  items,
  totalCount,
}: ExpensesReportTableProps) {
  const { updateParams, pagination } = useTabQuery("expenses", params);
  const { searchInput, setSearchInput } = useDebouncedSearch(
    "expenses",
    params,
    updateParams
  );
  const { selectedIds, toggleSelect, toggleSelectAll, clearSelection } =
    useRowSelection();

  const rows = useMemo(() => items.map(normalizeExpense), [items]);

  const headCells: HeadCell<GeneralExpense>[] = [
    createCheckboxColumn(
      selectedIds,
      toggleSelect,
      toggleSelectAll,
      rows.map((row) => row.id)
    ),
    { id: "date", label: "التاريخ", align: "center", renderCell: (row) => formatDate(row.date, "dd/MM/yyyy") },
    { id: "space", label: "المساحة", align: "center" },
    { id: "user", label: "المستخدم", align: "center" },
    { id: "category", label: "الفئة", align: "center" },
    { id: "amount", label: "المبلغ", align: "center" },
    {
      id: "status",
      label: "الحالة",
      align: "center",
      renderCell: (row) => (
        row.status === "Approved" ? (
          <StatusChip
            label="مكتمل"
            variant="success"
          />
        ) : row.status === "Pending" ? (
          <StatusChip
            label="معلق"
            variant="warning"
          />
        ) :row.status === "Rejected" ? (
          <StatusChip
            label="مرفوض"
            variant="error"
          />
        ) : null
      ),
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "stretch", sm: "center" },
          justifyContent: "space-between",
          gap: 2,
          mb: 2.5,
        }}
      >
        <TextField
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="بحث..."
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify
                    icon="solar:magnifer-linear"
                    width={20}
                    sx={{ color: "#9CA3AF" }}
                  />
                </InputAdornment>
              ),
            },
          }}
          sx={searchFieldSx}
        />

        <Select
          value={params.Status}
          onChange={(e: SelectChangeEvent) => {
            clearSelection();
            updateParams({
              Status: e.target.value || null,
              SkipCount: "0",
            });
          }}
          size="small"
          displayEmpty
          sx={filterFieldSx}
        >
          {STATUS_OPTIONS.map((opt) => (
            <MenuItem key={opt.value || "all"} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <SimpleTable<GeneralExpense>
        data={rows}
        headCells={headCells}
        serverPagination={{
          ...pagination,
          count: totalCount || rows.length,
        }}
      />
    </Box>
  );
}
