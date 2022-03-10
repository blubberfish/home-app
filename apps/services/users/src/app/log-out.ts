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
  if (cookie['S'] && /^test$/i.test(cookie['S'])) {
    try {
      const people = await usersCollectionFactory();
      await people.findOneAndUpdate(
        { 'webSession.id': cookie['S'] },
        {
          $unset: { webSession: '' },
        },
        { returnDocument: 'after', upsert: false }
      );
    } catch (e) {
      console.error(e);
    }
  }
  return {
    statusCode: 200,
    headers: {
      'Set-Cookie': serialize('S', 'none'),
    },
  };
};

registerHandler(HttpMethod.POST, logoutHandler);
