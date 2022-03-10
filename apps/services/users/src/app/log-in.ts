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
  if (!/^\/?login/.test(path)) return null;

  const { username, password } = JSON.parse(body ?? '') ?? {};
  if (username && password) {
    try {
      const people = await usersCollectionFactory();
      const sessionId = uuid();

      const person = await people.findOne({ username });
      if (person && (await match(password, person.password))) {
        const { value } = await people.findOneAndUpdate(
          { _id: person._id },
          {
            $set: {
              webSession: {
                id: sessionId,
                startedOn: Date.now(),
              },
            },
          },
          {
            returnDocument: 'after',
            upsert: false,
            projection: { password: 0 },
          }
        );

        return {
          statusCode: 200,
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