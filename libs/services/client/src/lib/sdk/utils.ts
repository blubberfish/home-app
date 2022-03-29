import { HttpHeader, HttpMethod } from '@blubberfish/types';

export type ApiOption<I, O> = {
  url: string;
  restricted?: boolean;
  method?: HttpMethod;
  builders?: Partial<{
    url: (input?: I, base?: string) => string;
    headers: (input?: I) => Promise<HeadersInit>;
    body: (input?: I, headers?: HeadersInit) => string;
    response: (response: unknown, headers: Headers) => Promise<O>;
    responseType?: 'json' | 'text';
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
      const { response: responseBuilder, responseType } = builders;
      return responseBuilder?.(
        await response[responseType ?? 'json'](),
        response.headers
      );
    } else {
      return Promise.reject(new Error(`api.error_${response.status}`));
    }
  };
};
