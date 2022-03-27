import { BaseUrl, HttpMethod } from '@blubberfish/types';
import { createApi } from './utils';

export const login = createApi<{ username: string; password: string }, string>({
  method: HttpMethod.POST,
  url: `${BaseUrl.REST}/login`,
  builders: {
    body: (input) => JSON.stringify(input),
    response: async (response) => response as string,
  },
});
