import {
  ServiceException,
  apiExceptionFactory,
  HttpMethod,
  registerHandler,
  accountCollectionFactory,
  obfuscate,
} from '@blubberfish/services/core';
import { Account } from '@blubberfish/types';

const createAccountHandler = async (event) => {
  const { path, body } = event;
  if (!/^\/?account$/i.test(path)) return null;

  try {
    const data = (JSON.parse(body) as Partial<Account>) ?? {};

    const username = data?.username?.trim();
    const password = data?.password?.trim();
    const displayName = data?.displayName?.trim();

    if (!(username && password && displayName))
      return apiExceptionFactory(
        ServiceException.IncompletePayload,
        'One or more fields are missing.',
        400
      );

    const accounts = await accountCollectionFactory();
    const exists = await accounts.findOne({
      username,
    });
    if (exists)
      return apiExceptionFactory(
        ServiceException.DuplicateRecord,
        'One or more records already exists.',
        409
      );

    const { insertedId } = await accounts.insertOne({
      _meta: {
        createdOn: new Date(),
      },
      displayName,
      family: {
        children: [],
        parents: [],
      },
      password: await obfuscate(password),
      username,
    });

    return {
      statusCode: 200,
      body: insertedId.toHexString(),
    };
  } catch (e) {
    console.error(e);
    return apiExceptionFactory(ServiceException.Unknown, e.message, 500);
  }
};

registerHandler(HttpMethod.POST, createAccountHandler);
