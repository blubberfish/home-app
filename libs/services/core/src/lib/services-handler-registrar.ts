export enum HttpMethod {
  GET = 'GET',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
}

export type Handler<E, R, C = unknown> = (event: E, context: C) => Promise<R>;

export type Registry<E, R, C> = { [P in HttpMethod]: Handler<E, R, C>[] };
