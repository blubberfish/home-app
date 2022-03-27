import { MongoClient } from 'mongodb';
import { Account } from '@blubberfish/types';

const DATABASE = {
  NAME: 'cradle',
  COLLECTION: {
    ACCOUNT: 'account',
    WEBSOCKET_GROUP: 'web_socket_groups',
    USERS: 'people',
    BABIES: 'babies',
    BABY_TRACKING: 'baby_tracking',
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

export const accountCollectionFactory = async () =>
  (await clientFactory())
    .db(DATABASE.NAME)
    .collection<Account>(DATABASE.COLLECTION.ACCOUNT);

/*
export const usersCollectionFactory = async () =>
  (await clientFactory())
    .db(DATABASE.NAME)
    .collection<User>(DATABASE.COLLECTION.USERS);

export const babiesCollectionFactory = async () =>
  (await clientFactory())
    .db(DATABASE.NAME)
    .collection<BabyProfile>(DATABASE.COLLECTION.BABIES);

export const babyTrackerCollectionFactory = async () =>
  (await clientFactory())
    .db(DATABASE.NAME)
    .collection<BabyTrackingData>(DATABASE.COLLECTION.BABY_TRACKING);

export const webSocketGroupCollection = async () =>
  (await clientFactory())
    .db(DATABASE.NAME)
    .collection<SubscriberGroup>(DATABASE.COLLECTION.WEBSOCKET_GROUP);
*/
