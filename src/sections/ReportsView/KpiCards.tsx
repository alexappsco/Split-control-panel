"use client";

import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { kpiLabelSx, getKpiCardSx } from "src/components/kpi-card-styles";

import DashboardCard from "./DashboardCard";
import { CHART_ASSETS, type KpiChartType } from "./constants";

const CHART_SRC: Record<KpiChartType, string> = {
  line: CHART_ASSETS.lineGreen,
  bar: CHART_ASSETS.bar,
  chart: CHART_ASSETS.lineBlue,
};
type KpiCardsProps = {
  summaryData?: any;
};
  function mapSummaryToKpiCards(summaryData: any): KpiCardData[] {
    return [{
      id: "total-expenses",
      label: "إجمالي المصروفات",
      value: `${(summaryData as any).totalExpenses?.value ?? 0} ريال`,
      chartType: "line",
      footer: { direction: ((summaryData as any).totalExpenses?.trendPercentage?? 0) > 0 ? "up" : "down", text: `${(summaryData as any).totalExpenses?.trendPercentage?? 0}% than last week` },
    },
    {
      id: "active-users",
      label: "عدد المستخدمين النشطين",
      value: `${(summaryData as any).activeUsers.value ?? 0}`,
      chartType: "chart",
      footer: { direction: ((summaryData as any).activeUsers?.trendPercentage?? 0) > 0 ? "up" : "down", text: `${(summaryData as any).activeUsers?.trendPercentage?? 0}% ` },
    },
    {
      id: "operations-count",
      label: "عدد العمليات",
      value: `${(summaryData as any).totalOperations.value ?? 0}`,
      chartType: "line",
      footer: {
        direction: ((summaryData as any).totalOperations?.trendPercentage?? 0) > 0 ? "up" : "down",
        text: `إجمالي عدد المصروفات المسجلة ${((summaryData as any).totalOperations?.trendPercentage?? 0)}%`,
      },
    },
    {
      id: "active-spaces",
      label: "عدد المساحات النشطة",
      value: `${(summaryData as any).activeSpaces.value ?? 0}`,
      chartType: "chart",
      footer: { direction: ((summaryData as any).activeSpaces?.trendPercentage?? 0) > 0 ? "up" : "down", text: `${(summaryData as any).activeSpaces?.trendPercentage?? 0}% ` },
    },
    {
      id: "avg-spend-per-space",
      label: "متوسط الصرف لكل مساحة",
      value: `${(summaryData as any).averageExpensePerSpace.value ?? 0} ريال`,
      chartType: "chart",
      footer: {
        direction: ((summaryData as any).averageExpensePerSpace?.trendPercentage?? 0) > 0 ? "up" : "down",
        text: `${(summaryData as any).averageExpensePerSpace?.trendPercentage?? 0}% إجمالي قيم ${((summaryData as any).averageExpensePerSpace?.value?? 0)} ريال`,
      },
    },
    {
      id: "top-spending-space",
      label: "أكبر مساحة صرفاً",
      value: "سكن مشترك",
      subValue: `${(summaryData as any).highestExpenseSpace.totalAmount ?? 0} ريال`,
      chartType: "line",
      footer: { direction: ((summaryData as any).highestExpenseSpace?.trendPercentage?? 0) > 0 ? "up" : "down", text: `${(summaryData as any).highestExpenseSpace?.trendPercentage?? 0}% ` },
    },
  ];
}


export type KpiCardData = {
  id: string;
  label: string;
  value: string;
  subValue?: string;
  chartType: KpiChartType;
  footer: {
    direction: "up" | "down";
    text: string;
  };
};
export default function KpiCards({ summaryData }: KpiCardsProps) {
  
  const cards = summaryData ? mapSummaryToKpiCards(summaryData) : [];
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        },
        gap: 2.5,
      }}
    >
      {cards.map((card, index) => {
        const isUp = card.footer.direction === "up";
        const trendColor = isUp ? "#00A76F" : "#FF5630";

        return (
          <DashboardCard key={card.id} sx={getKpiCardSx(`${index * 0.07}s`)}>
            <Typography sx={[kpiLabelSx, { mb: 1.5 }]}>{card.label}</Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                direction: "ltr",
                mb: 1.5,
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 44,
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                <Image
                  src={CHART_SRC[card.chartType]}
                  alt=""
                  fill
                  sizes="80px"
                  style={{ objectFit: "contain" }}
                />
              </Box>

              <Box sx={{ textAlign: "right", minWidth: 0, flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: card.subValue ? { xs: 20, md: 22 } : { xs: 26, md: 30 },
                    fontWeight: 800,
                    lineHeight: 1.2,
                    color: "#0F172A",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {card.value}
                </Typography>

                {card.subValue && (
                  <Typography
                    sx={{
                      fontSize: { xs: 22, md: 26 },
                      fontWeight: 800,
                      lineHeight: 1.2,
                      color: "#0F172A",
                      mt: 0.25,
                    }}
                  >
                    {card.subValue}
                  </Typography>
                )}
              </Box>
            </Box>

            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                flexWrap: "wrap",
              }}
            >
              <Image
                src={isUp ? CHART_ASSETS.trendUp : CHART_ASSETS.trendDown}
                alt=""
                width={14}
                height={14}
              />
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: trendColor,
                  lineHeight: 1.4,
                }}
              >
                {card.footer.text}
              </Typography>
            </Box>
          </DashboardCard>
        );
      })}
    </Box>
  );
}
