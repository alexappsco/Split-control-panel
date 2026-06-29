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
import type { ReportSpace } from "../constants";
import type { SpacesTabParams } from "../reports-params";
import {
  asRecord,
  createCheckboxColumn,
  filterFieldSx,
  searchFieldSx,
  useDebouncedSearch,
  useRowSelection,
  useTabQuery,
} from "./report-table-shared";
import { useFormat } from "src/utils/format-time";

type SpacesReportTableProps = {
  params: SpacesTabParams;
  items: unknown[];
  totalCount: number;
};

function normalizeSpace(
  row: unknown,
  index: number,
  t: ReturnType<typeof useTranslations>
): ReportSpace {
  const data = asRecord(row);
  const membersCount = data.membersCount ?? data.memberCount ?? 0;
  const operations = Number(data.operations ?? 0);

  return {
    id: String(data.id ?? index),
    spaceName: String(data.spaceName ?? data.name ?? ""),
    operationsCount: String(
      data.operationsCount ??
        data.transactionsCount ??
        t("Pages.Reports.operations_unit", { count: operations })
    ),
    totalExpenses: String(data.totalExpenses ?? data.totalAmount ?? ""),
    membersCount: String(
      typeof membersCount === "number"
        ? t("Pages.Reports.members_count", { count: membersCount })
        : membersCount
    ),
    lastActivityDate: String(data.lastActivityDate ?? data.lastActiveDate ?? data.updatedAt ?? ""),
  };
}

const MEMBERS_FILTER_VALUES = ["", "2", "3", "4", "5"] as const;

export default function SpacesReportTable({
  params,
  items,
  totalCount,
}: SpacesReportTableProps) {
  const t = useTranslations();
  const { formatDate } = useFormat();
  const { updateParams, pagination } = useTabQuery("spaces", params);
  const { searchInput, setSearchInput } = useDebouncedSearch(
    "spaces",
    params,
    updateParams
  );
  const { selectedIds, toggleSelect, toggleSelectAll, clearSelection } =
    useRowSelection();

  const rows = useMemo(
    () => items.map((item, index) => normalizeSpace(item, index, t)),
    [items, t]
  );

  const headCells: HeadCell<ReportSpace>[] = [
    createCheckboxColumn(
      selectedIds,
      toggleSelect,
      toggleSelectAll,
      rows.map((row) => row.id)
    ),
    { id: "spaceName", label: t("Pages.Reports.columns.space_name"), align: "center" },
    { id: "operationsCount", label: t("Pages.Reports.columns.operations_count"), align: "center" },
    { id: "totalExpenses", label: t("Pages.Reports.columns.total_expenses"), align: "center" },
    { id: "membersCount", label: t("Pages.Reports.columns.members_count"), align: "center" },
    { id: "lastActivityDate", label: t("Pages.Reports.columns.last_activity"), align: "center", renderCell: (row) => formatDate(row.lastActivityDate as any, "dd/MM/yyyy") },
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

        <Select
          value={params.MinMembersCount}
          onChange={(e: SelectChangeEvent) => {
            clearSelection();
            updateParams({
              MinMembersCount: e.target.value || null,
              SkipCount: "0",
            });
          }}
          size="small"
          displayEmpty
          sx={filterFieldSx}
        >
          {MEMBERS_FILTER_VALUES.map((value) => (
            <MenuItem key={value || "all"} value={value}>
              {!value
                ? t("Pages.Reports.members_filter")
                : value === "5"
                  ? t("Pages.Reports.members_count_plus", { count: value })
                  : t("Pages.Reports.members_count", { count: value })}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <SimpleTable<ReportSpace>
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
