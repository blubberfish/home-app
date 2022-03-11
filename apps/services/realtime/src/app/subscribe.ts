import { ObjectId, WithId } from 'mongodb';
import { webSocketGroupCollection } from '@blubberfish/services/core';
import { User } from '@blubberfish/types';

const createGroup = async (topic: string, users: WithId<Partial<User>>[]) => {
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

const deleteGroup = async (id: string) => {
  const group = await webSocketGroupCollection();
  await group.findOneAndDelete({ _id: new ObjectId(id) });
};

const addToGroup = async (id: string, users: WithId<Partial<User>>[]) => {
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

const removeFromGroup = async (id: string, users: WithId<Partial<User>>[]) => {
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

const listConnectedClients = async () => {
  const group = await webSocketGroupCollection();
  return (await group
    .find({}, { projection: { _id: 0 } })
    .toArray()) as WithoutId<ClientSchema>[];
};

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<Partial<APIGatewayProxyResult>> => {
  const {
    body,
    requestContext: { apiId, connectionId, routeKey, stage },
  } = event;
  console.log(`Received: ${routeKey} | ${body} > from ${connectionId}`);
  if (connectionId && routeKey) {
    switch (routeKey) {
      case '$connect': {
        await addToGroup(connectionId);
        return {
          statusCode: 200,
        };
      }
      case '$disconnect': {
        await removeFromGroup(connectionId);
        return {
          statusCode: 200,
        };
      }
      default: {
        console.log(`$default | ${body} > from ${connectionId}`);
        const api = new ApiGatewayManagementApi({
          apiVersion: 'latest',
          endpoint: `https://${apiId}.execute-api.ap-southeast-1.amazonaws.com/${stage}`,
        });
        const clients = await listConnectedClients();
        try {
          await Promise.all(
            clients.map(({ client }) =>
              api
                .postToConnection({
                  ConnectionId: client,
                  Data: JSON.stringify({ message: 'hello world' }),
                })
                .promise()
            )
          );
          console.log('Sent to clients');
          return {
            statusCode: 200,
          };
        } catch (e) {
          console.error(e);
          return {
            statusCode: 500,
            body: JSON.stringify({
              message: (e as Error).message,
              timestamp: new Date().toISOString(),
            }),
          };
        }
      }
    }
  }
  return {
    statusCode: 404,
    body: 'Handled!',
  };
};
