export enum HttpMethod {
  GET = 'GET',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
}

export type Handler<E, R, C = unknown> = (event: E, context: C) => Promise<R>;

export type Registry<E, R, C> = Partial<{
  [P in HttpMethod]: { [name: string]: Handler<E, R, C> };
}>;

/** @todo */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const registrar: Registry<any, any, any> = {};

export const register = <E, R, C>(
  method: HttpMethod,
  handler: Handler<E, R, C>
) => {
  registrar[method] = { ...registrar[method], [handler.name]: handler };
};
