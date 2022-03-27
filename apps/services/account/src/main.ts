import {
  hanlderRegistrar,
  Handler,
  HttpHeader,
  HttpMethod,
} from '@blubberfish/services/core';
import './app/log-in';
import './app/log-out';
import './app/create-account';

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
            'Access-Control-Allow-Headers': `${HttpHeader.APIKEY}`,
            'Access-Control-Allow-Origin': headers[HttpHeader.ORIGIN] || '*',
          },
        };
      }
    }
  }
  return { statusCode: 404 };
};
