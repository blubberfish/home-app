import {
  apiExceptionFactory,
  HttpHeader,
  HttpMethod,
  registerHandler,
  ServiceException,
  validateSession,
} from '@blubberfish/services/core';

const logoutHandler = async (event) => {
  const { headers, path } = event;
  if (!/^\/?current\/?/i.test(path)) return null;

  try {
    const person = await validateSession(headers[HttpHeader.SESSION]);
    if (person) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, sessionContext, _id, ...data } = person;
      return {
        statusCode: 200,
        body: JSON.stringify({ _id: _id.toHexString(), ...data }),
      };
    }
  } catch (e) {
    console.error(e);
  }
  return apiExceptionFactory(ServiceException.InvalidSession, '', 401);
};

registerHandler(HttpMethod.GET, logoutHandler);
