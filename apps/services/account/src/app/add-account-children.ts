import { v4 as uuid } from 'uuid';
import {
  ServiceException,
  apiExceptionFactory,
  HttpMethod,
  registerHandler,
  accountCollectionFactory,
} from '@blubberfish/services/core';
import { PersonEntityPayload } from '@blubberfish/types';
import { ObjectId } from 'mongodb';

const addAccountChildrenHandler = async (event) => {
  const { path, body } = event;
  if (!/^\/?account\/[0-9a-fA-F]+\/children$/i.test(path)) return null;

  try {
    const persons = (JSON.parse(body) ?? []) as PersonEntityPayload[];
    if (!persons.length)
      return apiExceptionFactory(ServiceException.IncompletePayload, '', 304);

    const [, id] = (
      (path as string).startsWith('/')
        ? (path as string).substring(1)
        : (path as string)
    ).split('/');
    if (!id) return apiExceptionFactory(ServiceException.DoesNotExist, '', 404);

    const accounts = await accountCollectionFactory();
    const { ok, value, lastErrorObject } = await accounts.findOneAndUpdate(
      {
        _id: ObjectId.createFromHexString(id),
      },
      {
        $set: {
          '_meta.updatedOn': new Date(),
        },
        $push: {
          'family.children': {
            $each: persons.map(({ dtob, ...person }) => ({
              ...person,
              dtob: new Date(dtob),
              uuid: uuid(),
            })),
          },
        },
      },
      {
        projection: {
          _meta: 0,
          password: 0,
        },
        returnDocument: 'after',
        upsert: false,
      }
    );

    if (!ok) console.error({ '!ok': lastErrorObject });
    return ok
      ? {
          statusCode: 200,
          body: JSON.stringify(value),
        }
      : { statusCode: 500 };
  } catch (e) {
    console.error(e);
    return apiExceptionFactory(ServiceException.Unknown, e.message, 500);
  }
};

registerHandler(HttpMethod.PUT, addAccountChildrenHandler);
