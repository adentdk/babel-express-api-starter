/* eslint-disable no-param-reassign */
import { logger } from '@utils/logger';
import config from '@config/config';
import { Server } from 'socket.io';

const onConnection = (io) => {
  io.use((socket, next) => {
    const { username } = socket.handshake.auth;

    if (username) {
      socket.username = username;
      return next();
    }

    return next(new Error('must login'));
  });

  io.on('connection', (socket) => {
    socket.emit('connected', true);
    socket.on('message', (payload) => {
      socket.emit('message', payload);
      socket.broadcast.emit('message', payload);
    });
    socket.on('disconnect', async () => {

    });
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
