import { endpoints } from 'src/utils/endpoints';
import { getData } from 'src/utils/crud-fetch-api';
import UsersView from 'src/sections/UsersView/view';
import {
  buildUsersEndpoint,
  extractPagedResult,
  parseUsersSearchParams,
} from 'src/sections/UsersView/users-params';

type UsersPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const resolvedSearchParams = await searchParams;
  const pageParams = parseUsersSearchParams(resolvedSearchParams);

  const isBlocked = pageParams.status === 'blocked';
  const activeEndpoint = buildUsersEndpoint(pageParams);

  const [usersResponse, allCountResponse, activeCountResponse, inactiveCountResponse] =
    await Promise.all([
      isBlocked
        ? Promise.resolve({ success: true, data: { items: [], totalCount: 0 } })
        : getData<unknown>(activeEndpoint),
      getData<unknown>(`${endpoints.users.get}?SkipCount=0&MaxResultCount=1`),
      getData<unknown>(`${endpoints.users.get}?IsActive=true&SkipCount=0&MaxResultCount=1`),
      getData<unknown>(`${endpoints.users.get}?IsActive=false&SkipCount=0&MaxResultCount=1`),
    ]);

  const pagedUsers = extractPagedResult<any>(usersResponse.data);
  const allCount = extractPagedResult<any>(allCountResponse.data).totalCount;
  const activeCount = extractPagedResult<any>(activeCountResponse.data).totalCount;
  const inactiveCount = extractPagedResult<any>(inactiveCountResponse.data).totalCount;

  const counts = {
    all: allCount,
    active: activeCount,
    inactive: inactiveCount,
    blocked: 0,
  };

  return (
    <UsersView
      users={pagedUsers.items}
      totalCount={pagedUsers.totalCount}
      counts={counts}
      params={pageParams}
    />
  );
}