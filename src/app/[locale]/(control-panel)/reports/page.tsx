import { endpoints } from "src/utils/endpoints";
import { getData } from "src/utils/crud-fetch-api";
import ReportsView from "src/sections/ReportsView/view";
import { extractPagedResult, buildReportsEndpoint, parseReportsSearchParams } from "src/sections/ReportsView/reports-params";

type ReportsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ReportsPage({ searchParams }: ReportsPageProps) {
  const resolvedSearchParams = await searchParams;
  const pageParams = parseReportsSearchParams(resolvedSearchParams);
  const activeTabParams = pageParams[pageParams.tab];
  const activeTabEndpoint = buildReportsEndpoint(pageParams.tab, activeTabParams);
  const spacesOptionsEndpoint = `${endpoints.reports.spaces}?SkipCount=0&MaxResultCount=100`;

  const [summaryResponse, tabResponse, spacesOptionsResponse] = await Promise.all([
    getData<unknown>(endpoints.reports.summary),
    getData<unknown>(activeTabEndpoint),
    pageParams.tab === 'users'
      ? getData<unknown>(spacesOptionsEndpoint)
      : Promise.resolve(null),
  ]);

  const summaryData = summaryResponse.success ? summaryResponse.data : null;
  const tabPagedData = tabResponse.success
    ? extractPagedResult(tabResponse.data)
    : { items: [], totalCount: 0 };

  const spacesOptions =
    spacesOptionsResponse && spacesOptionsResponse.success
      ? extractPagedResult<{ id: string; spaceName?: string; name?: string }>(
          spacesOptionsResponse.data
        ).items
      : [];

  return (
    <ReportsView
      pageParams={pageParams}
      summaryData={summaryData}
      tableItems={tabPagedData.items}
      totalCount={tabPagedData.totalCount}
      spacesOptions={spacesOptions}
    />
  );
}
