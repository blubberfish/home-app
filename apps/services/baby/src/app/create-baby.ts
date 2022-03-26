import {
  ServiceException,
  apiExceptionFactory,
  HttpMethod,
  registerHandler,
  babiesCollectionFactory,
  validateSession,
} from '@blubberfish/services/core';
import { BabyProfile, HttpHeader } from '@blubberfish/types';

const createBabyHandler = async ({ path, header, body }) => {
  if (!/^\/?baby/i.test(path)) return null;

  const person = await validateSession(header[HttpHeader.SESSION]);
  try {
    if (person) {
      const { dateOfBirth, familyName, givenName, preferredName } = (JSON.parse(
        body ?? ''
      ) ?? {}) as Partial<BabyProfile>;
      if (dateOfBirth && familyName && givenName) {
        const DOB =
          typeof dateOfBirth === 'string' || typeof dateOfBirth === 'number'
            ? new Date(dateOfBirth)
            : dateOfBirth;

        const babies = await babiesCollectionFactory();
        const { insertedId } = await babies.insertOne({
          familyName,
          givenName,
          preferredName,
          dateOfBirth: DOB,
        });
        return {
          statusCode: 200,
          body: insertedId.toHexString(),
        };
      }
    }
  } catch (e) {
    console.error(e);
    return apiExceptionFactory(ServiceException.Unknown, e.message, 500);
  }
  return apiExceptionFactory(ServiceException.IncompletePayload, '', 400);
};

registerHandler(HttpMethod.POST, createBabyHandler);
