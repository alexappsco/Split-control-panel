import { endpoints } from 'src/utils/endpoints';
import { getTranslations } from 'next-intl/server';
import { getData } from 'src/utils/crud-fetch-api';
import { NoPermissionView } from 'src/sections/error';
import { FetchTags } from 'src/actions/config-actions';
import { DEFAULT_LIMIT } from 'src/components/constant';
import HomeView from 'src/sections/home/views/list-view';
import { Reports, SettingData, SalesRevenue, PurchasedProduct } from 'src/types/home';

// ----------------------------------------------------------------------

interface Props {
  searchParams: Promise<Record<'page' | 'limit' | 'status' | 'search' | 'StartDate' | 'EndDate', string | undefined>>;
}

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

type LatestContributionsResponse = {
  totalCount: number;
  items: Contribution[];
}; // ✅ Added the missing closing brace!

export default async function HomePage() {
  const [statsResponse, contributionsResponse] = await Promise.all([
    getData<DashboardStats>(endpoints.dashboard.stats),
    getData<LatestContributionsResponse>(
      endpoints.dashboard.latestContributions
    ),
  ]);

  if (!statsResponse.success) {
    return null;
  }

  const contributions =
    contributionsResponse.success
      ? contributionsResponse.data.items
      : [];

  return (
    <HomeView
      stats={statsResponse.data}
      contributions={contributions}
      // mostPurchaseProducts={mostPurchaseProducts.data.items}
      // reports={reports.data}
      // salesRenveu={SalesRenveu.data}
      // freeShipping={freeShipping?.data?.data?.items}
    />
  );
}

export async function generateMetadata({ params }: { params: Promise<any> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
  };
}