import { BaseUrl, HttpMethod, User } from '@blubberfish/types'
import { createApi } from './utils'

export const listUser = createApi<void, User[]>({
    method: HttpMethod.POST,
    url: `${BaseUrl.REST}/users`,
    builders: {
        response: Promise.resolve
    }
})

export const createUser = createApi<User, void>({
    method: HttpMethod.POST,
    url: `${BaseUrl.REST}/user`,
    builders: {
        body: (input) => JSON.stringify(input)
    }
})

export const deleteUser = createApi<string, void>({
    method: HttpMethod.POST,
    url: `${BaseUrl.REST}/user`,
    builders: {
        url: (input, base) => `${base}/${input}`
    }
})