import { BaseUrl, HttpMethod, BabyActivityPayload } from '@blubberfish/types';
import { createApi } from './utils';

export const logWakeActivity = createApi<BabyActivityPayload, void>({
  method: HttpMethod.POST,
  restricted: true,
  url: `${BaseUrl.REST}/baby/log/wake`,
  builders: {
    body: (input) => JSON.stringify(input),
  },
});
