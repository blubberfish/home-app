import {
  apiExceptionFactory,
  obfuscate,
  registerHandler,
  usersCollectionFactory,
  CreateUserPayload,
  HttpMethod,
  ServiceException,
} from '@blubberfish/services/core';

const userCreateHandler = async (event) => {
  const { path, body } = event;
  if (!/^\/?user$/i.test(path)) return null;

  let { familyName, givenName, password, username, preferredName } =
    (JSON.parse(body || '') || {}) as Partial<CreateUserPayload>;
  familyName = familyName?.trim();
  givenName = givenName?.trim();
  password = password?.trim();
  username = username?.trim();
  preferredName = preferredName?.trim();

  if (!(familyName && givenName && password && username))
    return apiExceptionFactory(ServiceException.IncompletePayload, '', 400);

  try {
    const people = await usersCollectionFactory();
    const existingRecord = await people.findOne({
      username: username,
    });

    if (existingRecord)
      return apiExceptionFactory(ServiceException.DuplicateRecord, '', 409);

    await people.insertOne({
      familyName,
      givenName,
      preferredName,
      username,
      password: await obfuscate(password),
      createdOn: new Date().toISOString(),
    });

    return {
      statusCode: 200,
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: apiExceptionFactory(ServiceException.Unknown, e.message, 500),
    };
  }
};

registerHandler(HttpMethod.POST, userCreateHandler);
