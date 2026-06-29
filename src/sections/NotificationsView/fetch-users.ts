import { endpoints } from 'src/utils/endpoints';
import { getData } from 'src/utils/crud-fetch-api';

import { extractUserOptions } from './notifications-mapper';

import type { NotificationUserOption } from './types';

export async function fetchUserOptions(): Promise<NotificationUserOption[]> {
  const response = await getData<unknown>(
    `${endpoints.users.get}?SkipCount=0&MaxResultCount=1000`
  );

  return response.success ? extractUserOptions(response.data) : [];
}
