import {
  hanlderRegistrar,
  Handler,
  HttpMethod,
} from '@blubberfish/services/core';
import './app/log-in';
import './app/users-list';
import './app/user-create';
import './app/user-delete';
import './app/log-in';
import './app/log-out';

exports.handler = async (event, context) => {
  const { httpMethod } = event;
  if (httpMethod && hanlderRegistrar[httpMethod as HttpMethod]) {
    for (const handler of Object.values<Handler<any, any, any>>(
      hanlderRegistrar[httpMethod]
    )) {
      const result = await handler(event, context);
      if (result) {
        return result;
      }
    }
  }
  return { statusCode: 404 };
};
