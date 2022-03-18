import {
  BaseUrl,
  HttpMethod,
  User,
  CurrentUser,
  CreateUserPayload,
} from '@blubberfish/types';
import { createApi } from './utils';

export const login = createApi<
  { username: string; password: string },
  CurrentUser
>({
  method: HttpMethod.POST,
  url: `${BaseUrl.REST}/login`,
  builders: {
    body: (input) => JSON.stringify(input),
    response: async (response) => response as CurrentUser,
  },
});

export const currentUser = createApi<void, CurrentUser>({
  method: HttpMethod.GET,
  restricted: true,
  url: `${BaseUrl.REST}/current`,
  builders: {
    response: async (response) => response as CurrentUser,
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
  restricted: true,
  url: `${BaseUrl.REST}/user`,
  builders: {
    body: (input) => JSON.stringify(input),
  },
});

export const deleteUser = createApi<string, void>({
  method: HttpMethod.POST,
  restricted: true,
  url: `${BaseUrl.REST}/user`,
  builders: {
    url: (input, base) => `${base}/${input}`,
  },
});
