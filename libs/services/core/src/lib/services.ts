import { ObjectId } from 'mongodb';
import { usersCollectionFactory } from './database';
import { sessionDeserializer } from './factory';

export const validateSession = async (rawSession: string) => {
  const session = sessionDeserializer(rawSession);
  if (session) {
    const [W, U] = session;
    const people = await usersCollectionFactory();
    const person = await people.findOne({
      _id: ObjectId.createFromHexString(U),
      'sessionContext.web.session': W,
    });
    if (person) return person;
  }
  return false;
};
