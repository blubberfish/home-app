import {
  ApplicationSession,
  BaseUrl,
  HttpMethod,
  User,
  CurrentUser,
  CreateUserPayload,
} from '@blubberfish/types';
import {
  createApi,
  appSess2Store,
  store2AppSess,
  serializeAppSess,
} from './utils';

export const login = createApi<
  { username: string; password: string },
  ApplicationSession
>({
  method: HttpMethod.POST,
  url: `${BaseUrl.REST}/login`,
  builders: {
    body: (input) => JSON.stringify(input),
    response: async (response) => {
      const session = response as ApplicationSession;
      appSess2Store(session);
      return session;
    },
  },
});

export const currentUser = createApi<void, CurrentUser>({
  method: HttpMethod.GET,
  restricted: true,
  url: `${BaseUrl.REST}/current`,
  builders: {
    headers: async () => ({
      'x-session': serializeAppSess(store2AppSess()),
    }),
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
