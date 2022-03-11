import { ApiGatewayManagementApi } from 'aws-sdk';
import { unlinkSocket } from './app/subscribe';

export const handler = async (event) => {
  const {
    body,
    requestContext: { apiId, connectionId, routeKey, stage },
  } = event;
  console.log(`Received: ${routeKey} | ${body} > from ${connectionId}`);
  if (connectionId && routeKey) {
    switch (routeKey) {
      case '$connect': {
        return {
          statusCode: 200,
        };
      }
      case '$disconnect': {
        await unlinkSocket(connectionId);
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
        /*
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
        */
        return {
          statusCode: 200,
        };
      }
    }
  }
  return {
    statusCode: 404,
    body: 'Handled!',
  };
};
