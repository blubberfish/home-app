import { Handler, hanlderRegistrar } from '@blubberfish/services/core';
import { HttpHeader, HttpMethod } from '@blubberfish/types';
import './app/create-baby';

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
            'Access-Control-Allow-Headers': `${HttpHeader.APIKEY},${HttpHeader.SESSION}`,
            'Access-Control-Allow-Origin': headers[HttpHeader.ORIGIN] || '*',
          },
        };
      }
    }
  }
  return { statusCode: 404 };
};
