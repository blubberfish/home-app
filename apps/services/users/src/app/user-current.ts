import {
  apiExceptionFactory,
  usersCollectionFactory,
  HttpHeader,
  HttpMethod,
  registerHandler,
  ServiceException,
  sessionDeserializer,
} from '@blubberfish/services/core';
import { ObjectId } from 'mongodb';

const logoutHandler = async (event) => {
  const { headers, path } = event;
  if (!/^\/?current\/?/i.test(path)) return null;

  const session = sessionDeserializer(headers[HttpHeader.SESSION]);
  if (session) {
    const [W, U] = session;
    try {
      const people = await usersCollectionFactory();
      const person = await people.findOne(
        {
          _id: ObjectId.createFromHexString(U),
          'sessionContext.web.session': W,
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
  return apiExceptionFactory(ServiceException.InvalidSession, '', 401);
};

registerHandler(HttpMethod.GET, logoutHandler);
