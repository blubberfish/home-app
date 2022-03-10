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
