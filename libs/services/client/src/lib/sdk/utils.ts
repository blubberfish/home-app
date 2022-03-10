import { HttpMethod } from '@blubberfish/types'

export type ApiOption<I, O> = {
    url: string,
    method?: HttpMethod,
    builders?: Partial<{
        url: (input?: I, base?: string) => string,
        headers: (input?: I) => Promise<HeadersInit>,
        body: (input?: I, headers?: HeadersInit) => string
        response: (response: unknown, headers: Headers) => Promise<O>
    }>
}

export const createApi = <I, O>({ url, builders = {}, method = HttpMethod.GET }: ApiOption<I, O>) => {
    return async (params?: I) => {
        const { url: urlBuilder, headers: headersBuilder, body: bodyBuilder } = builders

        const fetchOptions: RequestInit = {}

        if (headersBuilder) {
            fetchOptions['headers'] = await headersBuilder(params)
        }

        if (bodyBuilder) {
            fetchOptions['body'] = await bodyBuilder(params, fetchOptions['headers'])
        }

        const response = await fetch(urlBuilder?.(params, url) || url, fetchOptions)
        if (response.ok) {
            const { response: responseBuilder } = builders
            return responseBuilder?.(await response.json(), response.headers)
        } else {
            return Promise.reject(new Error(`api.error_${response.status}`))
        }
    }
}