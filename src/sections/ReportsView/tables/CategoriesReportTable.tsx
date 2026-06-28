"use client";

import { useMemo } from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import Iconify from "src/components/iconify";
import SimpleTable from "src/components/SimpleTable";
import type { HeadCell } from "src/components/SimpleTable/types";
import type { ReportCategory } from "../constants";
import type { CategoriesTabParams } from "../reports-params";
import {
  asRecord,
  createCheckboxColumn,
  searchFieldSx,
  useDebouncedSearch,
  useRowSelection,
  useTabQuery,
} from "./report-table-shared";

type CategoriesReportTableProps = {
  params: CategoriesTabParams;
  items: unknown[];
  totalCount: number;
};

function normalizeCategory(row: unknown, index: number): ReportCategory {
  const data = asRecord(row);
  return {
    id: String(data.id ?? index),
    category: String(data.category ?? data.categoryName ?? data.name ?? ""),
    totalExpenses: String(data.totalExpenses ?? data.totalAmount ?? ""),
    operationsCount: String(data.operationsCount ?? data.transactionsCount ?? ""),
    percentageOfTotal: String(data.percentageOfTotal ?? data.percent ?? ""),
  };
}

export default function CategoriesReportTable({
  params,
  items,
  totalCount,
}: CategoriesReportTableProps) {
  const { updateParams, pagination } = useTabQuery("categories", params);
  const { searchInput, setSearchInput } = useDebouncedSearch(
    "categories",
    params,
    updateParams
  );
  const { selectedIds, toggleSelect, toggleSelectAll } = useRowSelection();

  const rows = useMemo(() => items.map(normalizeCategory), [items]);

  const headCells: HeadCell<ReportCategory>[] = [
    createCheckboxColumn(
      selectedIds,
      toggleSelect,
      toggleSelectAll,
      rows.map((row) => row.id)
    ),
    { id: "category", label: "الفئة", align: "center" },
    { id: "totalExpenses", label: "إجمالي المصروفات", align: "center" },
    { id: "operationsCount", label: "عدد العمليات", align: "center" },
    { id: "percentageOfTotal", label: "النسبة من الإجمالي", align: "center" },
  ];

  return (
    <Box>
      <Box sx={{ mb: 2.5 }}>
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
      </Box>

      <SimpleTable<ReportCategory>
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
