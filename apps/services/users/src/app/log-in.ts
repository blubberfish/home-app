import { serialize } from 'cookie';
import { v4 as uuid } from 'uuid';
import {
  ServiceException,
  apiExceptionFactory,
  HttpMethod,
  match,
  registerHandler,
  usersCollectionFactory,
} from '@blubberfish/services/core';

const loginHandler = async (event) => {
  const { path, body } = event;
  if (!/^\/?login/i.test(path)) return null;

  const { username, password } = JSON.parse(body ?? '') ?? {};
  if (username && password) {
    try {
      const people = await usersCollectionFactory();
      const person = await people.findOne({ username });
      if (person && (await match(password, person.password))) {
        const sessionId = uuid();
        const { value } = await people.findOneAndUpdate(
          { _id: person._id },
          {
            $set: {
              'sessionContext.web': {
                session: sessionId,
                startedOn: new Date().toISOString(),
              },
            },
          },
          {
            returnDocument: 'after',
            upsert: false,
            projection: {
              password: 0,
              sessionContext: 0,
            },
          }
        );

        return {
          statusCode: 200,
          multiValueHeaders: {
            'Set-Cookie': [
              serialize('W', sessionId),
              serialize('U', person._id.toHexString()),
            ],
          },
          body: JSON.stringify(value),
        };
      }
    } catch (e) {
      console.error(e);
      return apiExceptionFactory(ServiceException.Unknown, e.message, 500);
    }
  }

  return apiExceptionFactory(ServiceException.WrongCredentials, '', 401);
};

registerHandler(HttpMethod.POST, loginHandler);
