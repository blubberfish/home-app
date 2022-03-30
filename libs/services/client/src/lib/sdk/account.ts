import {
  BaseUrl,
  HttpMethod,
  CreateAccountPayload,
  AccountInfo,
  PersonEntityPayload,
} from '@blubberfish/types';
import { createApi } from './utils';

const transformAccountInfo = (response: unknown) => {
  const { family, ...data } = response as AccountInfo;
  return {
    ...data,
    family: {
      ...family,
      parents: family.children.map((parent) => ({
        ...parent,
        dtob: new Date(parent.dtob),
      })),
      children: family.children.map((child) => ({
        ...child,
        dtob: new Date(child.dtob),
      })),
    },
  } as AccountInfo;
};

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
    response: async (response) => transformAccountInfo(response),
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
    response: async (response) => transformAccountInfo(response),
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
    response: async (response) => transformAccountInfo(response),
  },
});
