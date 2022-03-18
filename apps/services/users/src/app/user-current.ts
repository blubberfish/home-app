import { parse, serialize } from 'cookie';
import {
  usersCollectionFactory,
  HttpMethod,
  registerHandler,
} from '@blubberfish/services/core';
import { ObjectId } from 'mongodb';

const logoutHandler = async (event) => {
  const { headers, path } = event;
  if (!/^\/?current\/?/i.test(path)) return null;

  const cookie = parse(headers['Cookie'] ?? '');
  console.table(headers);
  if (cookie['W'] && cookie['U']) {
    try {
      const people = await usersCollectionFactory();
      await people.findOneAndUpdate(
        {
          _id: ObjectId.createFromHexString(cookie['U']),
          'sessionContext.web.session': cookie['W'],
        },
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
    headers: {
      'Set-Cookie': `${serialize('W', 'none')};${serialize('U', 'none')}`,
    },
  };
};

registerHandler(HttpMethod.GET, logoutHandler);
