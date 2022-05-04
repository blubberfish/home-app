import {
  ServiceException,
  apiExceptionFactory,
  HttpMethod,
  registerHandler,
  accountCollectionFactory,
} from '@blubberfish/services/core';
import { ObjectId } from 'mongodb';

const updateAccountNameHandler = async (event) => {
  const { path, body } = event;
  if (!/^\/?account\/[0-9a-fA-F]+\/name$/i.test(path)) return null;

  try {
    const data = JSON.parse(body) ?? {};
    const displayName = data?.displayName?.trim?.();

    if (!displayName)
      return apiExceptionFactory(ServiceException.IncompletePayload, '', 400);

    const [, id] = (
      (path as string).startsWith('/')
        ? (path as string).substring(1)
        : (path as string)
    ).split('/');

    if (!id) return apiExceptionFactory(ServiceException.DoesNotExist, '', 404);

    const accounts = await accountCollectionFactory();
    const { ok, lastErrorObject } = await accounts.findOneAndUpdate(
      {
        _id: ObjectId.createFromHexString(id),
      },
      {
        $set: {
          '_meta.updatedOn': new Date(),
          displayName: displayName,
        },
      },
      {
        upsert: false,
      }
    );

    if (!ok) console.error({ '!ok': lastErrorObject });
    return {
      statusCode: ok ? 200 : 500,
    };
  } catch (e) {
    console.error(e);
    return apiExceptionFactory(ServiceException.Unknown, e.message, 500);
  }
};

registerHandler(HttpMethod.PATCH, updateAccountNameHandler);
