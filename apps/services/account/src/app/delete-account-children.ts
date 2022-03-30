import {
  ServiceException,
  apiExceptionFactory,
  HttpMethod,
  registerHandler,
  accountCollectionFactory,
} from '@blubberfish/services/core';
import { ObjectId } from 'mongodb';

const deleteAccountChildrenHandler = async (event) => {
  const { path, body } = event;
  if (!/^\/?account\/[0-9a-fA-F]+\/children$/i.test(path)) return null;

  try {
    const [, id] = (
      (path as string).startsWith('/')
        ? (path as string).substring(1)
        : (path as string)
    ).split('/');
    if (!id) return apiExceptionFactory(ServiceException.DoesNotExist, '', 404);

    const children = (JSON.parse(body) ?? []) as string[];
    if (!children.length)
      return apiExceptionFactory(ServiceException.IncompletePayload, '', 400);

    const accounts = await accountCollectionFactory();
    const { ok, value, lastErrorObject } = await accounts.findOneAndUpdate(
      {
        _id: ObjectId.createFromHexString(id),
      },
      {
        $set: {
          '_meta.updatedOn': new Date(),
        },
        $pull: {
          'family.children.uuid': {
            $in: children,
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

    if (!ok) console.error(lastErrorObject);
    return ok
      ? {
          statusCode: 200,
          body: JSON.stringify(value),
        }
      : apiExceptionFactory(ServiceException.Unknown, '', 500);
  } catch (e) {
    console.error(e);
    return apiExceptionFactory(ServiceException.Unknown, e.message, 500);
  }
};

registerHandler(HttpMethod.DELETE, deleteAccountChildrenHandler);
