import {
  ServiceException,
  apiExceptionFactory,
  HttpMethod,
  match,
  registerHandler,
  accountCollectionFactory,
} from '@blubberfish/services/core';

const loginHandler = async (event) => {
  const { path, body } = event;
  if (!/^\/?login/i.test(path)) return null;

  try {
    const { username, password } = JSON.parse(body ?? '') ?? {};
    if (username && password) {
      const accounts = await accountCollectionFactory();
      const account = await accounts.findOne({ username });
      if (account && (await match(password, account.password))) {
        return {
          statusCode: 200,
          body: account._id.toHexString(),
        };
      }
    }
  } catch (e) {
    console.error(e);
    return apiExceptionFactory(ServiceException.Unknown, e.message, 500);
  }

  return apiExceptionFactory(ServiceException.WrongCredentials, '', 401);
};

registerHandler(HttpMethod.POST, loginHandler);
