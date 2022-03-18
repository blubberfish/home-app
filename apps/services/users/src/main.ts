import {
  hanlderRegistrar,
  Handler,
  HttpMethod,
} from '@blubberfish/services/core';
import './app/cors-preflight';
import './app/log-in';
import './app/users-list';
import './app/user-current';
import './app/user-create';
import './app/user-delete';
import './app/log-in';
import './app/log-out';

exports.handler = async (event, context) => {
  const { httpMethod, headers } = event;
  if (httpMethod && hanlderRegistrar[httpMethod as HttpMethod]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const handler of Object.values<Handler<any, any, any>>(
      hanlderRegistrar[httpMethod]
    )) {
      const result = await handler(event, context);
      if (result) {
        return {
          ...result,
          headers: {
            ...result.headers,
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': headers['origin'] || '*',
          },
        };
      }
    }
  }
  return { statusCode: 404 };
};
