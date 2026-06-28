"use client";

import { Suspense } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import KpiCards from "./KpiCards";
import TransactionsTable from "./TransactionsTable";
import type { ReportsPageParams } from "./reports-params";

type SpaceOption = {
  id: string;
  spaceName?: string;
  name?: string;
};

type ReportsViewProps = {
  pageParams: ReportsPageParams;
  summaryData: any;
  tableItems: unknown[];
  totalCount: number;
  spacesOptions: SpaceOption[];
};

function TableFallback() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
      <CircularProgress size={28} />
    </Box>
  );
}

export default function ReportsView({
  pageParams,
  summaryData,
  tableItems,
  totalCount,
  spacesOptions,
}: ReportsViewProps) {
  return (
    <Box
      dir="rtl"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: 28, md: 34 },
          fontWeight: 700,
          color: "#111827",
          flexShrink: 0,
        }}
      >
        التقارير
      </Typography>

      <KpiCards summaryData={summaryData} />

      <Suspense fallback={<TableFallback />}>
        <TransactionsTable
          pageParams={pageParams}
          items={tableItems}
          totalCount={totalCount}
          spacesOptions={spacesOptions}
        />
      </Suspense>
    </Box>
  );
}
