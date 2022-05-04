import {
  ServiceException,
  apiExceptionFactory,
  HttpMethod,
  registerHandler,
  accountBabyLogCollectionFactory,
} from '@blubberfish/services/core';
import { BabyActivityPayload } from '@blubberfish/types';

const deleteAllActivityHandler = async (event) => {
  const { path, body } = event;
  if (!/^\/?baby\/log$/i.test(path)) return null;

  try {
    const { account, baby } = (JSON.parse(body) ?? {}) as BabyActivityPayload;
    const logs = await accountBabyLogCollectionFactory(account);
    if (logs && baby) {
      await logs.deleteMany({
        belongsTo: baby,
      });
      return {
        statusCode: 200,
      };
    }
    return {
      statusCode: 400,
    };
  } catch (e) {
    console.error(e);
    return apiExceptionFactory(ServiceException.Unknown, e.message, 500);
  }
};

registerHandler(HttpMethod.DELETE, deleteAllActivityHandler);
