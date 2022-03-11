import { ObjectId, WithId } from 'mongodb';
import {
  webSocketGroupCollection,
  usersCollectionFactory,
} from '@blubberfish/services/core';
import { User } from '@blubberfish/types';

export const linkSocket = async (
  connId: string,
  user: WithId<Partial<User>>
) => {
  if (!(user._id && connId)) return false;
  const users = await usersCollectionFactory();
  return users.findOneAndUpdate(
    { _id: user._id },
    {
      $set: {
        socketToken: connId,
        socketTokenCreatedOn: new Date().toISOString(),
      },
    }
  );
};

export const unlinkSocket = async (connId: string) => {
  const users = await usersCollectionFactory();
  return users.findOneAndUpdate(
    { socketToken: connId },
    {
      $unset: {
        socketToken: 1,
        socketTokenCreatedOn: 1,
      },
    }
  );
};

export const createGroup = async (
  topic: string,
  users: WithId<Partial<User>>[]
) => {
  const group = await webSocketGroupCollection();
  const record = await group.findOne({ topic });
  if (record) {
    return false;
  }
  return group.insertOne({
    topic,
    createdOn: new Date().toISOString(),
    users: users.map((user) => user._id.toHexString()),
  });
};

export const deleteGroup = async (id: string) => {
  const group = await webSocketGroupCollection();
  await group.findOneAndDelete({ _id: new ObjectId(id) });
};

export const addToGroup = async (
  id: string,
  users: WithId<Partial<User>>[]
) => {
  const group = await webSocketGroupCollection();
  await group.findOneAndUpdate(
    {
      _id: new ObjectId(id),
    },
    {
      $addToSet: {
        users: {
          $each: users.map((user) => user._id.toHexString()),
        },
      },
    }
  );
};

export const removeFromGroup = async (
  id: string,
  users: WithId<Partial<User>>[]
) => {
  const group = await webSocketGroupCollection();
  await group.findOneAndUpdate(
    {
      _id: new ObjectId(id),
    },
    {
      $pullAll: {
        users: users.map((user) => user._id.toHexString()),
      },
    }
  );
};
