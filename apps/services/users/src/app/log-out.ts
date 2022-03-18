import { parse, serialize } from 'cookie';
import {
  usersCollectionFactory,
  HttpMethod,
  registerHandler,
} from '@blubberfish/services/core';

const logoutHandler = async (event) => {
  const { headers, path } = event;
  if (!/^\/?logout/i.test(path)) return null;

  const cookie = parse(headers['Cookie'] ?? '');
  if (cookie['W']) {
    try {
      const people = await usersCollectionFactory();
      await people.findOneAndUpdate(
        { 'sessionContext.web.session': cookie['W'] },
        {
          $unset: { 'sessionContext.web': '' },
        },
        { returnDocument: 'after', upsert: false }
      );
    } catch (e) {
      console.error(e);
    }
  }
  return {
    statusCode: 200,
    multiValueHeaders: {
      'Set-Cookie': [serialize('W', 'none'), serialize('U', 'none')],
    },
  };
};

registerHandler(HttpMethod.POST, logoutHandler);
