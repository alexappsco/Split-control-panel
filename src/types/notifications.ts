export interface AdminNotification {
  id: string;
  titleAr: string;
  titleEn: string;
  bodyAr: string;
  bodyEn: string;
  receiverUserId: string;
  receiverUserName: string;
  isRead: boolean;
  isSuccess: boolean;
  creationTime: string;
  deviceToken?: string;
  receiverUserPhone?: string;
  senderUserId?: string;
  type?: string;
  errorMessage?: string;
}

export interface NotificationsListResponse {
  totalCount: number;
  items: AdminNotification[];
}

export interface SendNotificationRequest {
  titleAr: string;
  titleEn: string;
  bodyAr: string;
  bodyEn: string;
  sendToAll: boolean;
  userIds: string[];
}

export const FCM_NOTIFICATION_TYPES = [
  'SystemMaintenance',
  'SystemAlert',
  'AccountUpdate',
  'OrderPending',
  'OrderProcessing',
  'OrderStripped',
  'OrderDelivered',
  'OrderCanceled',
  'OrderDelayed',
  'ReturnRequested',
  'ReturnAccepted',
  'ReturnRejected',
  'Information',
  'Warning',
  'Error',
  'Success',
  'SystemUpdate',
] as const;
