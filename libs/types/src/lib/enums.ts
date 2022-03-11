export enum BaseUrl {
  REAL_TIME = 'wss://70fvoznwjf.execute-api.ap-southeast-1.amazonaws.com/production/',
  REST = 'https://ce3wh01ayk.execute-api.ap-southeast-1.amazonaws.com/prod'
}

export enum HttpMethod {
  GET = 'GET',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
}

export enum ServiceException {
  DuplicateRecord = 'record.duplicate',
  IncompletePayload = 'payload.incomplete',
  MissingCredential = 'credentials.missing',
  WrongCredentials = 'credentials.wrong',
  Unknown = 'unknown',
}

export enum FrontEndPath {
  Root = '/',
  Login = '/login',
}

export const FrontEndLoginPath = {
  Root: FrontEndPath.Login,
  NewUser: `${FrontEndPath.Login}/new-user`,
} as const