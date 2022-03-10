import { handler } from './app/list-users'
exports.handler = async (event) => {
  const result = await handler(event)
  return result || { statusCode: 404 }
};
