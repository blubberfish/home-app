export const BaseUrl = {
  REAL_TIME: 'wss://70fvoznwjf.execute-api.ap-southeast-1.amazonaws.com/production/',
  REST: 'https://ce3wh01ayk.execute-api.ap-southeast-1.amazonaws.com/prod'
} as const

export const HttpMethod = {
  GET: 'GET',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
  POST: 'POST',
  PUT: 'PUT',
} as const

export const ServiceException = {
  DuplicateRecord: 'record.duplicate',
  IncompletePayload: 'payload.incomplete',
  MissingCredential: 'credentials.missing',
  WrongCredentials: 'credentials.wrong',
  Unknown: 'unknown',
} as const

export type Enum<T extends object> = T[keyof T]