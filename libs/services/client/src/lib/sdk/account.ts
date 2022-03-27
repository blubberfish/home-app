import {
  BaseUrl,
  HttpMethod,
  CreateAccountPayload,
  AccountInfo,
  PersonEntityPayload,
} from '@blubberfish/types';
import { createApi } from './utils';

export const createAccount = createApi<CreateAccountPayload, void>({
  method: HttpMethod.POST,
  restricted: true,
  url: `${BaseUrl.REST}/account`,
  builders: {
    body: (input) => JSON.stringify(input),
  },
});

export const getAccountInfo = createApi<string, AccountInfo>({
  method: HttpMethod.GET,
  restricted: true,
  url: `${BaseUrl.REST}/account`,
  builders: {
    url: (input, base) => `${base}/${input}`,
  },
});

export const changeAccountName = createApi<{ displayName: string }, void>({
  method: HttpMethod.PATCH,
  restricted: true,
  url: `${BaseUrl.REST}/account`,
  builders: {
    url: (input, base) => `${base}/${input}/name`,
    body: (input) => JSON.stringify(input),
  },
});

export const addAccountParents = createApi<PersonEntityPayload[], void>({
  method: HttpMethod.PUT,
  restricted: true,
  url: `${BaseUrl.REST}/account`,
  builders: {
    url: (input, base) => `${base}/${input}/parents`,
    body: (input) => JSON.stringify(input),
  },
});

export const addAccountChildren = createApi<PersonEntityPayload[], void>({
  method: HttpMethod.PUT,
  restricted: true,
  url: `${BaseUrl.REST}/account`,
  builders: {
    url: (input, base) => `${base}/${input}/children`,
    body: (input) => JSON.stringify(input),
  },
});
