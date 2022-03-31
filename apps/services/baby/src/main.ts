import {
  hanlderRegistrar,
  Handler,
  HttpHeader,
  HttpMethod,
} from '@blubberfish/services/core';
import './app/get-all-activities';
import './app/delete-all-activity';
import './app/log-feed-activity';
import './app/log-sleep-activity';
import './app/log-wakeup-activity';

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
