import {
  ServiceException,
  apiExceptionFactory,
  HttpMethod,
  registerHandler,
  accountCollectionFactory,
} from '@blubberfish/services/core';
import { ObjectId } from 'mongodb';

const getAccountHandler = async (event) => {
  const { path } = event;
  if (!/^\/?account\/[0-9a-fA-F]+/i.test(path)) return null;

  try {
    const [, id] = (
      (path as string).startsWith('/')
        ? (path as string).substring(1)
        : (path as string)
    ).split('/');

    if (!id)
      return apiExceptionFactory(
        ServiceException.DoesNotExist,
        'ID was not provided.',
        404
      );

    const accounts = await accountCollectionFactory();
    const account = await accounts.findOne(
      {
        _id: ObjectId.createFromHexString(id),
      },
      {
        projection: {
          _meta: 0,
          password: 0,
        },
      }
    );
    if (!account)
      return apiExceptionFactory(
        ServiceException.DoesNotExist,
        'No record found.',
        404
      );

    return {
      statusCode: 200,
      body: JSON.stringify(account),
    };
  } catch (e) {
    console.error(e);
    return apiExceptionFactory(ServiceException.Unknown, e.message, 500);
  }
};

registerHandler(HttpMethod.GET, getAccountHandler);
