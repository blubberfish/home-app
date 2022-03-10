import {
  HttpMethod,
  registerHandler,
  usersCollectionFactory,
} from '@blubberfish/services/core';

const userListHandler = async (event) => {
  const { path } = event;
  if (!/^\/?users/i.test(path)) return null;

  const people = await usersCollectionFactory();
  try {
    const result = await (
      await people.find({}, { projection: { rtSession: 0, webSession: 0 } })
    ).toArray();
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: (e as Error).message,
    };
  }
};

registerHandler(HttpMethod.GET, userListHandler);
