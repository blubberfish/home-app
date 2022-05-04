import { HttpMethod, registerHandler } from '@blubberfish/services/core';

const corsHandler = async () => {
  return {
    statusCode: 200,
  };
};

registerHandler(HttpMethod.OPTIONS, corsHandler);
