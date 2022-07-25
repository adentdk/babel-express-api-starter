/* eslint-disable no-param-reassign */
import { logger } from '@utils/logger';
import config from '@config/config';
import { Server } from 'socket.io';
import chatSocket from './functions/chat';

export function initSocket(httpServer) {
  logger.info('Socket initiated');

  const io = new Server(httpServer, {
    cors: '*',
  });

  const ioChat = io.of(`${config.websocket.path}/chat`);

  chatSocket(ioChat);

  return io;
}

export default initSocket;
