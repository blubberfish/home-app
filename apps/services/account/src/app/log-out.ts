import { HttpMethod, registerHandler } from '@blubberfish/services/core';

const logoutHandler = async (event) => {
  const { path } = event;
  if (!/^\/?logout/i.test(path)) return null;

  return {
    statusCode: 200,
  };
};

registerHandler(HttpMethod.POST, logoutHandler);
