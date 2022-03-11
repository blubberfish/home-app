import { MongoClient } from 'mongodb';
import { User, SubscriberGroup } from '@blubberfish/types';

const DATABASE = {
  NAME: 'cradle',
  COLLECTION: {
    WEBSOCKET_GROUP: 'web_socket_groups',
    USERS: 'people',
  },
} as const;

let dbclient: MongoClient | null = null;

const clientFactory = async () => {
  if (!dbclient) {
    const { DB_H, DB_S, DB_U } = process.env;
    dbclient = new MongoClient(`mongodb+srv://${DB_U}:${DB_S}@${DB_H}/`, {
      w: 'majority',
      retryWrites: true,
    });
    await dbclient.connect();
  }
  return dbclient;
};

export const usersCollectionFactory = async () =>
  (await clientFactory())
    .db(DATABASE.NAME)
    .collection<User>(DATABASE.COLLECTION.USERS);

export const webSocketGroupCollection = async () =>
  (await clientFactory())
    .db(DATABASE.NAME)
    .collection<SubscriberGroup>(DATABASE.COLLECTION.WEBSOCKET_GROUP);
