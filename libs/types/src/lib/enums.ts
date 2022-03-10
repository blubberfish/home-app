export enum HttpMethod {
  GET = 'GET',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
}

export enum ServiceException {
  MissingCredential = 'credentials.missing',
  WrongCredentials = 'credentials.wrong',
  Unknown = 'unknown',
}
