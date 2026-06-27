"use client";

import type { HeadCell } from "src/components/SimpleTable/types";

import { useMemo } from "react";
import Iconify from "src/components/iconify";
import SimpleTable from "src/components/SimpleTable";
import {
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";

import type { ReportUser } from "../constants";
import type { UsersTabParams } from "../reports-params";

import {
  asRecord,
  useTabQuery,
  searchFieldSx,
  useRowSelection,
  useDebouncedSearch,
  createCheckboxColumn,
} from "./report-table-shared";

type SpaceOption = {
  id: string;
  spaceName?: string;
  name?: string;
};

type UsersReportTableProps = {
  params: UsersTabParams;
  items: unknown[];
  totalCount: number;
  spacesOptions: SpaceOption[];
};

function normalizeUser(row: unknown, index: number): ReportUser {
  const data = asRecord(row);
  return {
    id: String(data.id ?? index),
    userName: String(data.userName ?? data.name ?? ""),
    operationsCount: String(data.operationsCount ?? data.transactionsCount ?? ""),
    totalExpenses: String(data.totalExpenses ?? data.totalAmount ?? ""),
    averageExpense: String(data.averageExpense ?? data.averageAmount ?? ""),
    spacesCount: String(data.spacesCount ?? data.spaces ?? ""),
  };
}

export default function UsersReportTable({
  params,
  items,
  totalCount,
}: UsersReportTableProps) {
  const { updateParams, pagination } = useTabQuery("users", params);
  const { searchInput, setSearchInput } = useDebouncedSearch(
    "users",
    params,
    updateParams
  );
  const { selectedIds, toggleSelect, toggleSelectAll } =
    useRowSelection();

  const rows = useMemo(() => items.map(normalizeUser), [items]);



  const headCells: HeadCell<ReportUser>[] = [
    createCheckboxColumn(
      selectedIds,
      toggleSelect,
      toggleSelectAll,
      rows.map((row) => row.id)
    ),
    { id: "userName", label: "اسم المستخدم", align: "center" },
    { id: "operationsCount", label: "عدد العمليات", align: "center" },
    { id: "totalExpenses", label: "إجمالي المصروفات", align: "center" },
    { id: "averageExpense", label: "متوسط الصرف", align: "center" },
    { id: "spacesCount", label: "عدد المساحات", align: "center" },
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
{/* 
        <Select
          value={params.SpaceId}
          onChange={(e: SelectChangeEvent) => {
            clearSelection();
            updateParams({
              SpaceId: e.target.value || null,
              SkipCount: "0",
            });
          }}
          size="small"
          displayEmpty
          sx={filterFieldSx}
        >
          {spaceFilterOptions.map((opt) => (
            <MenuItem key={opt.value || "all"} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select> */}
      </Box>

      <SimpleTable<ReportUser>
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
