import {
  usersCollectionFactory,
  HttpMethod,
  registerHandler,
} from '@blubberfish/services/core';
import { ObjectId } from 'mongodb';

const logoutHandler = async (event) => {
  const { headers, path } = event;
  if (!/^\/?logout/i.test(path)) return null;

  const session = headers['x-session'];
  if (session) {
    const [W, U] = session.split(';');
    if (W && U) {
      try {
        const people = await usersCollectionFactory();
        await people.findOneAndUpdate(
          {
            _id: ObjectId.createFromHexString(U),
            'sessionContext.web.session': W,
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
  }
  return {
    statusCode: 200,
  };
};

registerHandler(HttpMethod.POST, logoutHandler);
