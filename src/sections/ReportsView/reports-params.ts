import { endpoints } from 'src/utils/endpoints';

import type { ReportTabValue } from './constants';

export const DEFAULT_MAX_RESULT_COUNT = 10;

export type BaseTabParams = {
  SearchTerm: string;
  Sorting: string;
  SkipCount: number;
  MaxResultCount: number;
};

export type ExpensesTabParams = BaseTabParams & {
  Status: string;
};

export type SpacesTabParams = BaseTabParams & {
  MinMembersCount: string;
};

export type UsersTabParams = BaseTabParams & {
  SpaceId: string;
};

export type CategoriesTabParams = BaseTabParams;

export type TabParamsMap = {
  expenses: ExpensesTabParams;
  spaces: SpacesTabParams;
  users: UsersTabParams;
  categories: CategoriesTabParams;
};

export type ReportsPageParams = {
  tab: ReportTabValue;
} & TabParamsMap;

function getParamValue(
  value: string | string[] | undefined
): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

function isReportTab(value: string | undefined): value is ReportTabValue {
  return (
    value === 'expenses' ||
    value === 'spaces' ||
    value === 'users' ||
    value === 'categories'
  );
}

export function tabQueryKey(tab: ReportTabValue, key: string) {
  return `${tab}_${key}`;
}

function parseBaseTabParams(
  tab: ReportTabValue,
  searchParams: Record<string, string | string[] | undefined>
): BaseTabParams {
  return {
    SearchTerm: getParamValue(searchParams[tabQueryKey(tab, 'SearchTerm')]) ?? '',
    Sorting: getParamValue(searchParams[tabQueryKey(tab, 'Sorting')]) ?? '',
    SkipCount:
      Number(getParamValue(searchParams[tabQueryKey(tab, 'SkipCount')]) ?? 0) || 0,
    MaxResultCount:
      Number(
        getParamValue(searchParams[tabQueryKey(tab, 'MaxResultCount')]) ??
          DEFAULT_MAX_RESULT_COUNT
      ) || DEFAULT_MAX_RESULT_COUNT,
  };
}

export function parseTabParams<T extends ReportTabValue>(
  tab: T,
  searchParams: Record<string, string | string[] | undefined> = {}
): TabParamsMap[T] {
  const base = parseBaseTabParams(tab, searchParams);

  switch (tab) {
    case 'expenses':
      return {
        ...base,
        Status: getParamValue(searchParams[tabQueryKey(tab, 'Status')]) ?? '',
      } as TabParamsMap[T];
    case 'spaces':
      return {
        ...base,
        MinMembersCount:
          getParamValue(searchParams[tabQueryKey(tab, 'MinMembersCount')]) ?? '',
      } as TabParamsMap[T];
    case 'users':
      return {
        ...base,
        SpaceId: getParamValue(searchParams[tabQueryKey(tab, 'SpaceId')]) ?? '',
      } as TabParamsMap[T];
    case 'categories':
      return base as TabParamsMap[T];
    default:
      return base as TabParamsMap[T];
  }
}

export function parseReportsSearchParams(
  searchParams: Record<string, string | string[] | undefined> = {}
): ReportsPageParams {
  const tabValue = getParamValue(searchParams.tab);
  const tab: ReportTabValue = isReportTab(tabValue) ? tabValue : 'expenses';

  return {
    tab,
    expenses: parseTabParams('expenses', searchParams),
    spaces: parseTabParams('spaces', searchParams),
    users: parseTabParams('users', searchParams),
    categories: parseTabParams('categories', searchParams),
  };
}

function appendBaseQuery(query: URLSearchParams, params: BaseTabParams) {
  if (params.SearchTerm.trim()) {
    query.set('SearchTerm', params.SearchTerm.trim());
  }

  if (params.Sorting.trim()) {
    query.set('Sorting', params.Sorting.trim());
  }

  query.set('SkipCount', String(params.SkipCount));
  query.set('MaxResultCount', String(params.MaxResultCount));
}

export function buildReportsEndpoint(
  tab: ReportTabValue,
  params: TabParamsMap[ReportTabValue]
): string {
  const query = new URLSearchParams();
  appendBaseQuery(query, params);

  switch (tab) {
    case 'expenses': {
      const expenseParams = params as ExpensesTabParams;
      if (expenseParams.Status) query.set('Status', expenseParams.Status);
      return `${endpoints.reports.expenses}?${query.toString()}`;
    }
    case 'spaces': {
      const spaceParams = params as SpacesTabParams;
      if (spaceParams.MinMembersCount) {
        query.set('MinMembersCount', spaceParams.MinMembersCount);
      }
      return `${endpoints.reports.spaces}?${query.toString()}`;
    }
    case 'users': {
      const userParams = params as UsersTabParams;
      if (userParams.SpaceId) query.set('SpaceId', userParams.SpaceId);
      return `${endpoints.reports.users}?${query.toString()}`;
    }
    case 'categories':
      return `${endpoints.reports.categories}?${query.toString()}`;
    default:
      return `${endpoints.reports.expenses}?${query.toString()}`;
  }
}

export function getReportsPage(params: BaseTabParams): number {
  if (!params.MaxResultCount) return 0;
  return Math.floor(params.SkipCount / params.MaxResultCount);
}

export type PagedResult<T> = {
  items: T[];
  totalCount: number;
};

export function extractPagedResult<T>(data: unknown): PagedResult<T> {
  if (!data) return { items: [], totalCount: 0 };

  if (Array.isArray(data)) {
    return { items: data as T[], totalCount: data.length };
  }

  if (typeof data !== 'object') {
    return { items: [], totalCount: 0 };
  }

  const record = data as Record<string, unknown>;

  if (Array.isArray(record.items)) {
    return {
      items: record.items as T[],
      totalCount: Number(record.totalCount ?? record.items.length) || 0,
    };
  }

  if (record.data) {
    return extractPagedResult<T>(record.data);
  }

  return { items: [], totalCount: 0 };
}

export function getTabQueryKeys(tab: ReportTabValue): string[] {
  const base = ['tab', ...Object.keys(parseTabParams(tab, {})).map((key) => tabQueryKey(tab, key))];
  return base;
}
