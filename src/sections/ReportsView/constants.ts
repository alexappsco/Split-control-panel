export const CARD_SX = {
  bgcolor: "#FFFFFF",
  border: "1px solid #E5E7EB",
  borderRadius: "16px",
  boxShadow: "none",
  p: 2.5,
} as const;

export const DATE_FILTER_OPTIONS = ["monthly", "weekly", "daily"] as const;
export const CATEGORY_FILTER_OPTIONS = [
  "all_categories",
  "housing",
  "transportation",
  "food",
  "other",
] as const;

export const CHART_ASSETS = {
  lineGreen: "/Sparkline.png",
  lineBlue: "/Sparkline2.png",
  bar: "/stack.png",
  trendUp: "/ic-solar_double-alt-arrow-up-bold-duotone.png",
  trendDown: "/ic-solar_double-alt-arrow-up-bold-duotone%20(2).png",
} as const;

export type KpiChartType = "line" | "bar" | "chart";


export const REPORT_TABS = [
  { value: "expenses" },
  { value: "spaces" },
  { value: "users" },
  { value: "categories" },
] as const;

export type ReportTabValue = (typeof REPORT_TABS)[number]["value"];

export type ExpenseStatus = "Completed" | "Pending" | "Rejected" | "Approved";

export type GeneralExpense = {
  id: string;
  date: string;
  space: string;
  user: string;
  category: string;
  amount: string;
  status: ExpenseStatus;
};

export type ReportSpace = {
  id: string;
  spaceName: string;
  operationsCount: string;
  totalExpenses: string;
  membersCount: string;
  lastActivityDate: string;
};

export type ReportUser = {
  id: string;
  userName: string;
  operationsCount: string;
  totalExpenses: string;
  averageExpense: string;
  spacesCount: string;
};

export type ReportCategory = {
  id: string;
  category: string;
  totalExpenses: string;
  operationsCount: string;
  percentageOfTotal: string;
};
