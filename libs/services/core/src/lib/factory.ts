import { ServiceException } from '@blubberfish/types';

export const apiExceptionFactory = (
  exception: ServiceException,
  details = '',
  statusCode = 500
) => ({
  statusCode,
  body: JSON.stringify({
    timestamp: new Date().toISOString(),
    kind: exception,
    details,
  }),
});