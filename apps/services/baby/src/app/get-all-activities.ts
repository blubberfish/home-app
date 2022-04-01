import {
  ServiceException,
  apiExceptionFactory,
  HttpMethod,
  registerHandler,
  accountBabyLogCollectionFactory,
} from '@blubberfish/services/core';
import { BabyActivityPayload } from '@blubberfish/types';

const getAllActivityHandler = async (event) => {
  const { path, queryStringParameters } = event;
  if (!/^\/?baby\/log$/i.test(path)) return null;

  try {
    const { account, baby } = (queryStringParameters ??
      {}) as BabyActivityPayload;
    if (account && baby) {
      const logs = await accountBabyLogCollectionFactory(account);
      if (logs) {
        const activities = await logs
          .find({
            belongsTo: baby,
          })
          .sort({
            dtob: 1,
          })
          .toArray();
        return {
          statusCode: 200,
          body: JSON.stringify(activities),
        };
      }
    }
    return {
      statusCode: 400,
    };
  } catch (e) {
    console.error(e);
    return apiExceptionFactory(ServiceException.Unknown, e.message, 500);
  }
};

registerHandler(HttpMethod.GET, getAllActivityHandler);
