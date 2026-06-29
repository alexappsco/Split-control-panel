import { endpoints } from 'src/utils/endpoints';
import { getData } from 'src/utils/crud-fetch-api';
import type { AdminNotification } from 'src/types/notifications';

import {
  extractNotificationsList,
  mapApiNotificationToRow,
} from './notifications-mapper';

import type { NotificationRow } from './types';

const PAGE_SIZE = 60;

export async function fetchAllNotifications(): Promise<NotificationRow[]> {
  let skipCount = 0;
  let totalCount = 0;
  const allItems: AdminNotification[] = [];

  do {
    const response = await getData<unknown>(
      `${endpoints.notifications.list}?SkipCount=${skipCount}&MaxResultCount=${PAGE_SIZE}`
    );

    if (!response.success) {
      break;
    }

    const page = extractNotificationsList(response.data);
    totalCount = page.totalCount;
    allItems.push(...page.items);
    skipCount += page.items.length;

    if (page.items.length === 0) {
      break;
    }
  } while (allItems.length < totalCount);

  return allItems.map(mapApiNotificationToRow);
}
