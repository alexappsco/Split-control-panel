"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
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
import type { ReportUser } from "../constants";
import type { UsersTabParams } from "../reports-params";
import {
  asRecord,
  createCheckboxColumn,
  filterFieldSx,
  searchFieldSx,
  useDebouncedSearch,
  useRowSelection,
  useTabQuery,
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
  spacesOptions,
}: UsersReportTableProps) {
  const t = useTranslations();
  const { updateParams, pagination } = useTabQuery("users", params);
  const { searchInput, setSearchInput } = useDebouncedSearch(
    "users",
    params,
    updateParams
  );
  const { selectedIds, toggleSelect, toggleSelectAll, clearSelection } =
    useRowSelection();

  const rows = useMemo(() => items.map(normalizeUser), [items]);

  const spaceFilterOptions = [
    { value: "", label: t("Pages.Reports.spaces_filter") },
    ...spacesOptions.map((space) => ({
      value: space.id,
      label: space.spaceName ?? space.name ?? space.id,
    })),
  ];

  const headCells: HeadCell<ReportUser>[] = [
    createCheckboxColumn(
      selectedIds,
      toggleSelect,
      toggleSelectAll,
      rows.map((row) => row.id)
    ),
    { id: "userName", label: t("Pages.Reports.columns.username"), align: "center" },
    { id: "operationsCount", label: t("Pages.Reports.columns.operations_count"), align: "center" },
    { id: "totalExpenses", label: t("Pages.Reports.columns.total_expenses"), align: "center" },
    { id: "averageExpense", label: t("Pages.Reports.columns.average_expense"), align: "center" },
    { id: "spacesCount", label: t("Pages.Reports.columns.spaces_count"), align: "center" },
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
          placeholder={t("Pages.Reports.search_placeholder")}
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
