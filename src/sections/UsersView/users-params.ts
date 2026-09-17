import { endpoints } from 'src/utils/endpoints';

export const DEFAULT_USERS_MAX_RESULT_COUNT = 10;

export type UserStatusFilter = 'all' | 'active' | 'inactive' | 'blocked';

export type UsersQueryParams = {
  SearchTerm: string;
  status: UserStatusFilter;
  Sorting: string;
  SkipCount: number;
  MaxResultCount: number;
};

function getParamValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export function parseUsersSearchParams(
  searchParams: Record<string, string | string[] | undefined> = {}
): UsersQueryParams {
  const rawStatus = getParamValue(searchParams.status);
  const status: UserStatusFilter =
    rawStatus === 'active' || rawStatus === 'inactive' || rawStatus === 'blocked'
      ? rawStatus
      : 'all';

  const skipCount = Number(getParamValue(searchParams.SkipCount) ?? 0) || 0;
  const maxResultCount =
    Number(getParamValue(searchParams.MaxResultCount) ?? DEFAULT_USERS_MAX_RESULT_COUNT) ||
    DEFAULT_USERS_MAX_RESULT_COUNT;

  return {
    SearchTerm: getParamValue(searchParams.SearchTerm) ?? '',
    status,
    Sorting: getParamValue(searchParams.Sorting) ?? '',
    SkipCount: skipCount < 0 ? 0 : skipCount,
    MaxResultCount: maxResultCount <= 0 ? DEFAULT_USERS_MAX_RESULT_COUNT : maxResultCount,
  };
}

export function buildUsersEndpoint(params: UsersQueryParams): string {
  const query = new URLSearchParams();

  if (params.SearchTerm.trim()) {
    query.set('SearchTerm', params.SearchTerm.trim());
  }

  if (params.status === 'active') {
    query.set('IsActive', 'true');
  } else if (params.status === 'inactive') {
    query.set('IsActive', 'false');
  }

  if (params.Sorting.trim()) {
    query.set('Sorting', params.Sorting.trim());
  }

  query.set('SkipCount', String(params.SkipCount));
  query.set('MaxResultCount', String(params.MaxResultCount));

  return `${endpoints.users.get}?${query.toString()}`;
}

export function getUsersPage(params: { SkipCount: number; MaxResultCount: number }): number {
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
