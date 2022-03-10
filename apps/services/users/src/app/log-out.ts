import { parse, serialize } from 'cookie';
import {
  usersCollectionFactory,
  HttpMethod,
  registerHandler,
} from '@blubberfish/services/core';

const logoutHandler = async (event) => {
  const { headers, path } = event;
  if (!/^\/?logout/.test(path)) return null;

  const cookie = parse(headers['Cookie'] ?? '');

  const people = await usersCollectionFactory();
  try {
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
  cookie['S'] = 'none';
  return {
    statusCode: 200,
    headers: {
      'Set-Cookie': Object.entries(cookie).reduce((data, entry) => {
        const cookieEntry = serialize(entry[0], entry[1]);
        return data ? `${data};${cookieEntry}` : cookieEntry;
      }, ''),
    },
  };
};

registerHandler(HttpMethod.POST, logoutHandler);
