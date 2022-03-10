import { HttpMethod } from '@blubberfish/types';

export type Handler<E, R, C = unknown> = (event: E, context: C) => Promise<R>;

export type Registry<E, R, C> = Partial<{
  [P in HttpMethod]: { [name: string]: Handler<E, R, C> };
}>;

/** @todo */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const hanlderRegistrar: Registry<any, any, any> = {};

export const registerHandler = <E, R, C>(
  method: HttpMethod,
  handler: Handler<E, R, C>
) => {
  hanlderRegistrar[method] = {
    ...hanlderRegistrar[method],
    [handler.name]: handler,
  };
};
