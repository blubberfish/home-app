import { parse, serialize } from 'cookie';
import {
  apiExceptionFactory,
  usersCollectionFactory,
  HttpMethod,
  registerHandler,
  ServiceException,
} from '@blubberfish/services/core';
import { ObjectId } from 'mongodb';

const logoutHandler = async (event) => {
  const { headers, path } = event;
  if (!/^\/?current\/?/i.test(path)) return null;

  const cookie = parse(headers['Cookie'] ?? '');
  if (cookie['W'] && cookie['U']) {
    try {
      const people = await usersCollectionFactory();
      const person = await people.findOne(
        {
          _id: ObjectId.createFromHexString(cookie['U']),
          'sessionContext.web.session': cookie['W'],
        },
        {
          projection: {
            sessionContext: 0,
            password: 0,
          },
        }
      );
      if (person)
        return {
          statusCode: 200,
          body: JSON.stringify(person),
        };
    } catch (e) {
      console.error(e);
    }
  }
  return {
    ...apiExceptionFactory(ServiceException.InvalidSession, '', 401),
    multiValueHeaders: {
      'Set-Cookie': [serialize('W', 'none'), serialize('U', 'none')],
    },
  };
};

registerHandler(HttpMethod.GET, logoutHandler);
