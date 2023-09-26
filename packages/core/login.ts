const { compare } = require('bcrypt');
const { ObjectId } = require('mongodb');
const { nanoid } = require('nanoid');
const { DB } = require('./common.js');

export enum LoginFailReason {
  MissingInfo = 'e.1.missing_username_password',
  BadCredential = 'e.1.bad_credential',
}

export interface LoginPayload {
  username: string;
  password: string;
}

export async function loginUser(
  dbclient: import('mongodb').MongoClient,
  details?: Partial<LoginPayload>,
) {
  const validatedPayload = validate(details);
  if (!validatedPayload) {
    throw new Error(LoginFailReason.MissingInfo);
  }
  const dbCollection = dbclient
    .db(DB.CRADLE.NAME)
    .collection(DB.CRADLE.COLLECTION.ACCOUNTS);
  const user = await dbCollection.findOne(
    {
      username: validatedPayload.username,
    },
    { projection: { _id: 1, password: 1 } },
  );
  const match =
    !!user && (await compare(validatedPayload.password, user.password));
  if (!match) {
    throw new Error(LoginFailReason.BadCredential);
  }
  const token = nanoid();
  const { matchedCount } = await dbCollection.updateOne(
    {
      _id: new ObjectId(user._id),
    },
    {
      $set: {
        session: {
          token,
          created: new Date(),
        },
      },
    },
  );
  if (!matchedCount) {
    throw new Error('could not set token');
  }
  return {
    userid: user._id.toString('hex'),
    token,
  };
}

function validate(payload: Partial<LoginPayload>): LoginPayload | null {
  const username = payload?.username?.trim();
  const password = payload?.password?.trim();
  if (!username || !password) {
    return null;
  }
  return {
    username,
    password,
  };
}
