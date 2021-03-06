import {
  ServiceException,
  apiExceptionFactory,
  HttpMethod,
  registerHandler,
  accountBabyLogCollectionFactory,
} from '@blubberfish/services/core';
import { BabyActivityPayload } from '@blubberfish/types';

const addSleepActivityHandler = async (event) => {
  const { path, body } = event;
  if (!/^\/?baby\/log\/sleep$/i.test(path)) return null;

  try {
    const { account, baby, additionalDetails } = (JSON.parse(body) ??
      {}) as BabyActivityPayload;
    const logs = await accountBabyLogCollectionFactory(account);
    if (logs && baby) {
      await logs.insertOne({
        activity: 'baby:activity:sleep',
        belongsTo: baby,
        timestamp: new Date(),
        notes: additionalDetails,
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

registerHandler(HttpMethod.POST, addSleepActivityHandler);
