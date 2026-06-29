"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getKpiCardSx, kpiLabelSx } from "src/components/kpi-card-styles";
import DashboardCard from "./DashboardCard";
import { CHART_ASSETS, type KpiChartType } from "./constants";

const CHART_SRC: Record<KpiChartType, string> = {
  line: CHART_ASSETS.lineGreen,
  bar: CHART_ASSETS.bar,
  chart: CHART_ASSETS.lineBlue,
};

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

type KpiCardsProps = {
  summaryData?: any;
};

function mapSummaryToKpiCards(
  summaryData: any,
  t: ReturnType<typeof useTranslations>
): KpiCardData[] {
  const currency = t("Pages.Reports.currency");

  return [
    {
      id: "total-expenses",
      label: t("Pages.Reports.kpi_total_expenses"),
      value: `${summaryData?.totalExpenses?.value ?? 0} ${currency}`,
      chartType: "line",
      footer: {
        direction:
          (summaryData?.totalExpenses?.trendPercentage ?? 0) > 0 ? "up" : "down",
        text: t("Pages.Reports.trend_than_last_week", {
          percent: summaryData?.totalExpenses?.trendPercentage ?? 0,
        }),
      },
    },
    {
      id: "active-users",
      label: t("Pages.Reports.kpi_active_users"),
      value: `${summaryData?.activeUsers?.value ?? 0}`,
      chartType: "chart",
      footer: {
        direction:
          (summaryData?.activeUsers?.trendPercentage ?? 0) > 0 ? "up" : "down",
        text: t("Pages.Reports.trend_percent", {
          percent: summaryData?.activeUsers?.trendPercentage ?? 0,
        }),
      },
    },
    {
      id: "operations-count",
      label: t("Pages.Reports.kpi_operations_count"),
      value: `${summaryData?.totalOperations?.value ?? 0}`,
      chartType: "line",
      footer: {
        direction:
          (summaryData?.totalOperations?.trendPercentage ?? 0) > 0
            ? "up"
            : "down",
        text: t("Pages.Reports.operations_footer", {
          percent: summaryData?.totalOperations?.trendPercentage ?? 0,
        }),
      },
    },
    {
      id: "active-spaces",
      label: t("Pages.Reports.kpi_active_spaces"),
      value: `${summaryData?.activeSpaces?.value ?? 0}`,
      chartType: "chart",
      footer: {
        direction:
          (summaryData?.activeSpaces?.trendPercentage ?? 0) > 0 ? "up" : "down",
        text: t("Pages.Reports.trend_percent", {
          percent: summaryData?.activeSpaces?.trendPercentage ?? 0,
        }),
      },
    },
    {
      id: "avg-spend-per-space",
      label: t("Pages.Reports.kpi_avg_spend_per_space"),
      value: `${summaryData?.averageExpensePerSpace?.value ?? 0} ${currency}`,
      chartType: "chart",
      footer: {
        direction:
          (summaryData?.averageExpensePerSpace?.trendPercentage ?? 0) > 0
            ? "up"
            : "down",
        text: t("Pages.Reports.avg_spend_footer", {
          percent: summaryData?.averageExpensePerSpace?.trendPercentage ?? 0,
          amount: summaryData?.averageExpensePerSpace?.value ?? 0,
        }),
      },
    },
    {
      id: "top-spending-space",
      label: t("Pages.Reports.kpi_top_spending_space"),
      value: String(summaryData?.highestExpenseSpace?.name ?? ""),
      subValue: `${summaryData?.highestExpenseSpace?.totalAmount ?? 0} ${currency}`,
      chartType: "line",
      footer: {
        direction:
          (summaryData?.highestExpenseSpace?.trendPercentage ?? 0) > 0
            ? "up"
            : "down",
        text: t("Pages.Reports.trend_percent", {
          percent: summaryData?.highestExpenseSpace?.trendPercentage ?? 0,
        }),
      },
    },
  ];
}

export default function KpiCards({ summaryData }: KpiCardsProps) {
  const t = useTranslations();
  const cards = summaryData ? mapSummaryToKpiCards(summaryData, t) : [];

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
                direction: "rtl",
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

              <Box sx={{ minWidth: 0, flex: 1, textAlign: "left" }}>
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
