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
    response: async (response) => response as AccountInfo,
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

export const addAccountParents = createApi<
  { account: string; data: PersonEntityPayload[] },
  void
>({
  method: HttpMethod.PUT,
  restricted: true,
  url: `${BaseUrl.REST}/account`,
  builders: {
    url: (input, base) => `${base}/${input?.account}/parents`,
    body: (input) => JSON.stringify(input?.data),
  },
});

export const addAccountChildren = createApi<
  { account: string; data: PersonEntityPayload[] },
  AccountInfo
>({
  method: HttpMethod.PUT,
  restricted: true,
  url: `${BaseUrl.REST}/account`,
  builders: {
    url: (input, base) => `${base}/${input?.account}/children`,
    body: (input) => JSON.stringify(input?.data),
    response: async (response) => response as AccountInfo,
  },
});

export const deleteAccountChildren = createApi<
  { account: string; data: string[] },
  AccountInfo
>({
  method: HttpMethod.DELETE,
  restricted: true,
  url: `${BaseUrl.REST}/account`,
  builders: {
    url: (input, base) => `${base}/${input?.account}/children`,
    body: (input) => JSON.stringify(input?.data),
    response: async (response) => response as AccountInfo,
  },
});
