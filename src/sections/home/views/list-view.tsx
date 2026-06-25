
'use client';
import React from 'react';
import { Box } from '@mui/material';

import ExpensesChart from './ExpensesChart';
import LatestBookings from './latestBookings';
import DashboardHeader from '../DashboardHeader';
import ExpenseCategories from './ExpenseCategories';

type DashboardStats = {
  subscribersCount: number;
  executedOperationsCount: number;
  recordedExpensesCount: number;
  recordedExpensesValue: number;
  totalSpacesCount: number;
  spaceTypesDistribution: {
    name: string;
    count: number;
  }[];
  expensesBreakdown: {
    approvedAmount: number;
    approvedPercentage: number;
    pendingAmount: number;
    pendingPercentage: number;
    rejectedAmount: number;
    rejectedPercentage: number;
    totalAmount: number;
  };
};
type Contribution = {
  index: number;
  title: string;
  spaceName: string;
  amount: number;
  status: string;
  date: string;
};

interface HomeViewProps {
  stats: DashboardStats;
  contributions: Contribution[];
}


export default function HomeView({
  stats,
  contributions,
}: HomeViewProps) {


  return (
    <Box
      dir="rtl"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <DashboardHeader stats={stats} />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
          gap: 3,
        }}
      >
       <Box
  sx={{
    display: "flex",
    flexDirection: "column",
    gap: 3,
    minWidth: 0,
  }}
>
  <Box sx={{ flex: 1 }}>
    <LatestBookings bookings={contributions} />
  </Box>

</Box>
       <Box
  sx={{
    display: "flex",
    flexDirection: "column",
    gap: 3,
    minWidth: 0,
  }}
>
  <Box sx={{ flex: 1 }}>
    <ExpenseCategories
  totalSpacesCount={stats.totalSpacesCount}
  categories={stats.spaceTypesDistribution}
/>
  </Box>
  <Box sx={{ flex: 1 }}>
    <ExpensesChart
  expensesBreakdown={stats.expensesBreakdown}
/>
  </Box>
</Box>
      </Box>
    </Box>
  );
}