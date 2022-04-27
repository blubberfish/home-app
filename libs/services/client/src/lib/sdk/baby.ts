import {
  BaseUrl,
  HttpMethod,
  BabyActivityPayload,
  BabyActivityProfilePayload,
} from '@blubberfish/types';
import { createApi } from './utils';

export const clearBabyActivityLog = createApi<BabyActivityPayload, void>({
  method: HttpMethod.DELETE,
  restricted: true,
  url: `${BaseUrl.REST}/baby/log`,
  builders: {
    body: (input) => JSON.stringify(input),
  },
});

export const getBabyActivityLog = createApi<
  BabyActivityPayload,
  BabyActivityProfilePayload[]
>({
  method: HttpMethod.GET,
  restricted: true,
  url: `${BaseUrl.REST}/baby/log`,
  builders: {
    url: (input, base) => {
      const query = new URLSearchParams();
      input &&
        Object.entries(input).forEach(([key, value]) => {
          query.set(key, value);
        });
      return `${base}?${query.toString()}`;
    },
    response: async (response) =>
      (response ?? []) as BabyActivityProfilePayload[],
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

export const logNursingActivity = createApi<BabyActivityPayload, void>({
  method: HttpMethod.POST,
  restricted: true,
  url: `${BaseUrl.REST}/baby/log/nursing`,
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

export const logBottleFeedActivity = createApi<BabyActivityPayload, void>({
  method: HttpMethod.POST,
  restricted: true,
  url: `${BaseUrl.REST}/baby/log/feed/bottle`,
  builders: {
    body: (input) => JSON.stringify(input),
  },
});

export const logLatchLeftFeedActivity = createApi<BabyActivityPayload, void>({
  method: HttpMethod.POST,
  restricted: true,
  url: `${BaseUrl.REST}/baby/log/latch/left`,
  builders: {
    body: (input) => JSON.stringify(input),
  },
});

export const logLatchRightFeedActivity = createApi<BabyActivityPayload, void>({
  method: HttpMethod.POST,
  restricted: true,
  url: `${BaseUrl.REST}/baby/log/latch/right`,
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
