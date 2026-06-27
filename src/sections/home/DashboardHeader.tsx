"use client";

import Image from "next/image";
import { Grid } from "@mui/system";
import { Box, Paper, Typography } from "@mui/material";

interface DashboardHeaderProps {
  stats: {
    subscribersCount: number;
    executedOperationsCount: number;
    recordedExpensesCount: number;
    recordedExpensesValue: number;
    totalSpacesCount: number;
  };
}

export default function DashboardHeader({
  stats,
}: DashboardHeaderProps) {
  const cards = [
    {
      label: "الأعضاء",
      value: stats.subscribersCount,
      icon: "/icons/members.svg",
      bg: "#EBF9F9",
      border: "#A4E5E3",
      color: "#004B50",
    },
    {
      label: "عدد العمليات المنفذة",
      value: stats.executedOperationsCount,
      icon: "/icons/expenses.svg",
      bg: "#EBF9F9",
      border: "#A4E5E3",
      color: "#006C9C",
    },
    {
      label: "عدد المصروفات المسجلة",
      value: stats.recordedExpensesCount,
      icon: "/icons/expenses.svg",
      bg: "#EBF9F9",
      border: "#A4E5E3",
      color: "#006C9C",
    },
    {
      label: "قيمة المصروفات المسجلة",
      value: stats.recordedExpensesValue,
      icon: "/icons/expenses.svg",
      bg: "#EBF9F9",
      border: "#A4E5E3",
      color: "#006C9C",
    },
    {
      label: "إجمالي المساحات",
      value: stats.totalSpacesCount,
      icon: "/icons/spaces.svg",
      bg: "#EBF9F9",
      border: "#A4E5E3",
      color: "#00B8D9",
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        {cards.map((item, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 2.4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                backgroundColor: item.bg,
                border: `1px solid ${item.border}`,
                borderRadius: 3,
                height: "100%",
                gap: 1.5,
              }}
            >
              <Box sx={{ width: 40, height: 40, position: "relative" }}>
                <Image
                  src={item.icon}
                  alt={item.label}
                  fill
                  sizes="40px"
                  style={{ objectFit: "contain" }}
                />
              </Box>

              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: item.color }}
              >
                {item.value}
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: item.color, fontWeight: 700 }}
              >
                {item.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}