import {
  BaseUrl,
  HttpMethod,
  User,
  CreateUserPayload,
} from '@blubberfish/types';
import { createApi } from './utils';

export const login = createApi<
  { username: string; password: string },
  Partial<User>
>({
  method: HttpMethod.POST,
  url: `${BaseUrl.REST}/login`,
  builders: {
    body: (input) => JSON.stringify(input),
    response: async (response) => response as Partial<User>,
  },
});

export const listUser = createApi<void, User[]>({
  method: HttpMethod.POST,
  url: `${BaseUrl.REST}/users`,
  builders: {
    response: Promise.resolve,
  },
});

export const createUser = createApi<CreateUserPayload, void>({
  method: HttpMethod.POST,
  url: `${BaseUrl.REST}/user`,
  builders: {
    headers: async () => ({
      'x-api-key': 'rxlVo3YyUaaU0IN5pEK202bZXQm49N8X4aRi1t3R',
    }),
    body: (input) => JSON.stringify(input),
  },
});

export const deleteUser = createApi<string, void>({
  method: HttpMethod.POST,
  url: `${BaseUrl.REST}/user`,
  builders: {
    url: (input, base) => `${base}/${input}`,
  },
});
