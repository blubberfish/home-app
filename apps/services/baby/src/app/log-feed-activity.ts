import {
  ServiceException,
  apiExceptionFactory,
  HttpMethod,
  registerHandler,
  accountBabyLogCollectionFactory,
} from '@blubberfish/services/core';
import { BabyActivityPayload } from '@blubberfish/types';

const addFeedActivityHandler = async (event) => {
  const { path, body } = event;
  if (!/^\/?baby\/log\/feed$/i.test(path)) return null;

  try {
    const { account, baby, additionalDetails } = (JSON.parse(body) ??
      {}) as BabyActivityPayload;
    const logs = await accountBabyLogCollectionFactory(account);
    if (logs && baby) {
      await logs.insertOne({
        activity: 'baby:activity:feed',
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

const addBottleFeedActivityHandler = async (event) => {
  const { path, body } = event;
  if (!/^\/?baby\/log\/feed\/bottle$/i.test(path)) return null;

  try {
    const { account, baby, additionalDetails } = (JSON.parse(body) ??
      {}) as BabyActivityPayload;
    const logs = await accountBabyLogCollectionFactory(account);
    if (logs && baby) {
      await logs.insertOne({
        activity: 'baby:activity:feed:bottle',
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

const addLatchLeftActivityHandler = async (event) => {
  const { path, body } = event;
  if (!/^\/?baby\/log\/latch\/left$/i.test(path)) return null;

  try {
    const { account, baby, additionalDetails } = (JSON.parse(body) ??
      {}) as BabyActivityPayload;
    const logs = await accountBabyLogCollectionFactory(account);
    if (logs && baby) {
      await logs.insertOne({
        activity: 'baby:activity:feed:latch:l',
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

const addLatchRightActivityHandler = async (event) => {
  const { path, body } = event;
  if (!/^\/?baby\/log\/latch\/right$/i.test(path)) return null;

  try {
    const { account, baby, additionalDetails } = (JSON.parse(body) ??
      {}) as BabyActivityPayload;
    const logs = await accountBabyLogCollectionFactory(account);
    if (logs && baby) {
      await logs.insertOne({
        activity: 'baby:activity:feed:latch:r',
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

registerHandler(HttpMethod.POST, addFeedActivityHandler);
registerHandler(HttpMethod.POST, addBottleFeedActivityHandler);
registerHandler(HttpMethod.POST, addLatchLeftActivityHandler);
registerHandler(HttpMethod.POST, addLatchRightActivityHandler);
