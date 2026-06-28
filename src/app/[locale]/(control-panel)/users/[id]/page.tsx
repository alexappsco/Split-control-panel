
import { endpoints } from "src/utils/endpoints";
import { getData } from "src/utils/crud-fetch-api";
import { UserType, SpaceType } from "src/types/employee copy";
import UserDetailView from "src/sections/UsersView/UserDetailView";

type UserDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function UserDetailPage({
  params,
}: UserDetailPageProps) {
  const { id } = await params;

  // User Details
  const userResponse = await getData<UserType>(endpoints.users.single(id));

  // User Spaces
  const spacesResponse = await getData<{ totalCount: number; items: SpaceType[] }>(
    endpoints.users.space(id)
  );

  // Handle case when user is not found
  if (!userResponse.success || !userResponse.data) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>User not found</h2>
        <p>The requested user could not be found.</p>
      </div>
    );
  }

  return (
    <UserDetailView
      user={userResponse.data}
      spaces={spacesResponse.success ? spacesResponse.data : { totalCount: 0, items: [] }}
    />
  );
}