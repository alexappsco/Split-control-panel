import type { AdminNotification, NotificationsListResponse } from 'src/types/notifications';

import type { NotificationRow, NotificationUserOption } from './types';

export function mapApiNotificationToRow(item: AdminNotification): NotificationRow {
  return {
    id: item.id,
    titleAr: item.titleAr,
    titleEn: item.titleEn,
    bodyAr: item.bodyAr,
    bodyEn: item.bodyEn,
    receiverUserId: item.receiverUserId,
    creationTime: item.creationTime,
    isRead: item.isRead,
    isSuccess: item.isSuccess,
  };
}

export function extractUserOptions(data: unknown): NotificationUserOption[] {
  const apiData = data as
    | { items?: { id: string; name: string }[] }
    | { id: string; name: string }[]
    | undefined;

  const list = Array.isArray(apiData) ? apiData : apiData?.items ?? [];

  return list.map((user) => ({
    id: user.id,
    name: user.name,
  }));
}

export function getUserNameById(
  users: NotificationUserOption[],
  userId: string
): string {
  return users.find((user) => user.id === userId)?.name ?? '—';
}

export function extractNotificationsList(data: unknown): {
  items: AdminNotification[];
  totalCount: number;
} {
  if (!data || typeof data !== 'object') {
    return { items: [], totalCount: 0 };
  }

  const payload = data as NotificationsListResponse;

  if (Array.isArray(payload.items)) {
    return {
      items: payload.items,
      totalCount: payload.totalCount ?? payload.items.length,
    };
  }

  return { items: [], totalCount: 0 };
}
