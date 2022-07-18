/* eslint-disable no-param-reassign */
import { logger } from '@utils/logger';
import config from '@config/config';
import { Server } from 'socket.io';

const onConnection = (io) => {
  io.on('connection', (socket) => {
    socket.emit('connected', true);
  });
};

export function initSocket(httpServer) {
  logger.info('Socket initiated');

  const io = new Server(httpServer, {
    cors: '*',
  });

  const ioServer = io.of(config.websocket.path);

  onConnection(ioServer);
}

export default initSocket;
