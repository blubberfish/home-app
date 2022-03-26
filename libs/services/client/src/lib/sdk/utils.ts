import { ApplicationSession, HttpHeader, HttpMethod } from '@blubberfish/types';

export type ApiOption<I, O> = {
  url: string;
  restricted?: boolean;
  method?: HttpMethod;
  builders?: Partial<{
    url: (input?: I, base?: string) => string;
    headers: (input?: I) => Promise<HeadersInit>;
    body: (input?: I, headers?: HeadersInit) => string;
    response: (response: unknown, headers: Headers) => Promise<O>;
  }>;
};

export const createApi = <I, O>({
  url,
  restricted,
  builders = {},
  method = HttpMethod.GET,
}: ApiOption<I, O>) => {
  return async (params?: I) => {
    const {
      url: urlBuilder,
      headers: headersBuilder,
      body: bodyBuilder,
    } = builders;

    const fetchOptions: RequestInit = {
      method,
    };

    if (headersBuilder) {
      fetchOptions['headers'] = await headersBuilder(params);
    }

    if (restricted) {
      fetchOptions['credentials'] = 'include';
      if (process.env['NX_APIKEY']) {
        fetchOptions['headers'] = {
          ...fetchOptions['headers'],
          [HttpHeader.APIKEY]: process.env['NX_APIKEY'],
        };
      }
    }

    if (bodyBuilder) {
      fetchOptions['body'] = await bodyBuilder(params, fetchOptions['headers']);
    }

    const response = await fetch(
      urlBuilder?.(params, url) || url,
      fetchOptions
    );
    if (response.ok) {
      const { response: responseBuilder } = builders;
      return responseBuilder?.(await response.json(), response.headers);
    } else {
      return Promise.reject(new Error(`api.error_${response.status}`));
    }
  };
};

type SessionKey = keyof ApplicationSession;

export const appSess2Store = (session: ApplicationSession) => {
  (Object.keys(session) as SessionKey[]).forEach((key) => {
    localStorage.setItem(key, session[key]);
  });
};

export const store2AppSess = () =>
  (['U', 'W'] as SessionKey[]).reduce(
    (seed: Partial<ApplicationSession> | null, key) => {
      const value = localStorage.getItem(key);
      if (!seed || !value) return null;
      return {
        ...seed,
        [key]: value,
      };
    },
    {}
  );

export const serializeAppSess = (session: Partial<ApplicationSession>) =>
  `${session.W};${session.U}`;
