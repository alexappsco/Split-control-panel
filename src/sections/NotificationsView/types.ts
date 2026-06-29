export type NotificationStatusFilter = 'all' | 'active' | 'inactive';

export type NotificationRow = {
  id: string;
  titleAr: string;
  titleEn: string;
  bodyAr: string;
  bodyEn: string;
  receiverUserId: string;
  creationTime: string;
  isRead: boolean;
  isSuccess: boolean;
};

export type NotificationUserOption = {
  id: string;
  name: string;
};

export type SendNotificationPayload = {
  titleAr: string;
  titleEn: string;
  bodyAr: string;
  bodyEn: string;
  sendToAll: boolean;
  userIds: string[];
};

export type NotificationsViewProps = {
  notifications: NotificationRow[];
  users: NotificationUserOption[];
};
