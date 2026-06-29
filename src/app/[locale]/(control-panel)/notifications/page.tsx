import NotificationsView from 'src/sections/NotificationsView/view';
import { fetchAllNotifications } from 'src/sections/NotificationsView/fetch-notifications';
import { fetchUserOptions } from 'src/sections/NotificationsView/fetch-users';

export default async function NotificationsPage() {
  const [notifications, users] = await Promise.all([
    fetchAllNotifications(),
    fetchUserOptions(),
  ]);

  return (
    <NotificationsView
      notifications={notifications}
      users={users}
    />
  );
}
