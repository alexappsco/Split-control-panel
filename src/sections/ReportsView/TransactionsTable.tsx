"use client";

import { Tab, Tabs } from "@mui/material";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DashboardCard from "./DashboardCard";
import { REPORT_TABS, type ReportTabValue } from "./constants";
import type {
  CategoriesTabParams,
  ExpensesTabParams,
  ReportsPageParams,
  SpacesTabParams,
  UsersTabParams,
} from "./reports-params";
import CategoriesReportTable from "./tables/CategoriesReportTable";
import ExpensesReportTable from "./tables/ExpensesReportTable";
import SpacesReportTable from "./tables/SpacesReportTable";
import UsersReportTable from "./tables/UsersReportTable";

type SpaceOption = {
  id: string;
  spaceName?: string;
  name?: string;
};

type TransactionsTableProps = {
  pageParams: ReportsPageParams;
  items: unknown[];
  totalCount: number;
  spacesOptions: SpaceOption[];
};

export default function TransactionsTable({
  pageParams,
  items,
  totalCount,
  spacesOptions,
}: TransactionsTableProps) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = pageParams.tab;

  const handleTabChange = (_: React.SyntheticEvent, value: ReportTabValue) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <DashboardCard sx={{ p: { xs: 2, md: 2.5 } }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          minHeight: 44,
          mb: 2.5,
          borderBottom: "1px solid #E5E7EB",
          "& .MuiTabs-indicator": {
            height: 2,
            bgcolor: "#111827",
            borderRadius: 0,
          },
        }}
      >
        {REPORT_TABS.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            label={t(`Pages.Reports.tabs.${tab.value}`)}
            sx={{
              fontSize: 15,
              fontWeight: activeTab === tab.value ? 700 : 500,
              color: activeTab === tab.value ? "#111827" : "#6B7280",
              minHeight: 44,
              px: 0,
              mr: 3,
            }}
          />
        ))}
      </Tabs>

      {activeTab === "expenses" && (
        <ExpensesReportTable
          params={pageParams.expenses as ExpensesTabParams}
          items={items}
          totalCount={totalCount}
        />
      )}

      {activeTab === "spaces" && (
        <SpacesReportTable
          params={pageParams.spaces as SpacesTabParams}
          items={items}
          totalCount={totalCount}
        />
      )}

      {activeTab === "users" && (
        <UsersReportTable
          params={pageParams.users as UsersTabParams}
          items={items}
          totalCount={totalCount}
          spacesOptions={spacesOptions}
        />
      )}

      {activeTab === "categories" && (
        <CategoriesReportTable
          params={pageParams.categories as CategoriesTabParams}
          items={items}
          totalCount={totalCount}
        />
      )}
    </DashboardCard>
  );
}
