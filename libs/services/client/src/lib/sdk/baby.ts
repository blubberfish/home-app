import { BaseUrl, HttpMethod, BabyActivityPayload } from '@blubberfish/types';
import { createApi } from './utils';

export const clearBabyActivityLog = createApi<BabyActivityPayload, void>({
  method: HttpMethod.DELETE,
  restricted: true,
  url: `${BaseUrl.REST}/baby/log`,
  builders: {
    body: (input) => JSON.stringify(input),
  },
});

export const logWakeActivity = createApi<BabyActivityPayload, void>({
  method: HttpMethod.POST,
  restricted: true,
  url: `${BaseUrl.REST}/baby/log/wake`,
  builders: {
    body: (input) => JSON.stringify(input),
  },
});

export const logFeedActivity = createApi<BabyActivityPayload, void>({
  method: HttpMethod.POST,
  restricted: true,
  url: `${BaseUrl.REST}/baby/log/feed`,
  builders: {
    body: (input) => JSON.stringify(input),
  },
});

export const logSleepActivity = createApi<BabyActivityPayload, void>({
  method: HttpMethod.POST,
  restricted: true,
  url: `${BaseUrl.REST}/baby/log/sleep`,
  builders: {
    body: (input) => JSON.stringify(input),
  },
});
