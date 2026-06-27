import { endpoints } from "src/utils/endpoints";
import { getData } from "src/utils/crud-fetch-api";
import UsersView from "src/sections/UsersView/view";

export default async function UsersPage() {
  const response = await getData<{
    totalCount: number;
    items: any[];
  } | any[]>(endpoints.users.get);

  const apiData = response.data as { items?: any[] } | any[] | undefined;
  const users = Array.isArray(apiData) ? apiData : apiData?.items ?? [];

  return <UsersView users={users} />;
}
