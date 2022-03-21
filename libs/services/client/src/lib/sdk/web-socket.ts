import { BaseUrl } from '@blubberfish/types';

const factory = () => {
  let webSock: WebSocket;

  const creataeWebSocket = () => {
    webSock = webSock || new WebSocket(BaseUrl.REAL_TIME);
    return webSock;
  };

  return creataeWebSocket;
};

export const createWebSocket = factory();
