import {
  apiExceptionFactory,
  registerHandler,
  usersCollectionFactory,
  HttpMethod,
  ServiceException,
} from '@blubberfish/services/core';

const userDeleteHandler = async (event) => {
  const { path, pathParameters } = event;
  if (!/^\/?user\//i.test(path)) return null;

  console.log('pathParameters', pathParameters);

  const { userid } = pathParameters;
  if (!userid)
    return apiExceptionFactory(ServiceException.IncompletePayload, '', 400);

  try {
    const people = await usersCollectionFactory();
    await people.deleteOne({
      _id: userid,
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

registerHandler(HttpMethod.DELETE, userDeleteHandler);
