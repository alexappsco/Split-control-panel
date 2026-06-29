import SendNotificationView from 'src/sections/NotificationsView/SendNotificationView';
import { fetchUserOptions } from 'src/sections/NotificationsView/fetch-users';

export default async function SendNotificationPage() {
  const users = await fetchUserOptions();

  return <SendNotificationView users={users} />;
}
