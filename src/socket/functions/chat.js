import db from '@models';
import { logger } from '@utils/logger';
import mustAuthenticatedJwt from '../middlewares/mustAuthenticatedJwt';

export default function chatSocket(io) {
  io.use(mustAuthenticatedJwt);
  io.on('connection', (socket) => {
    socket.on('login', () => {
      const { username } = socket;
      db.User.update({
        isActive: true,
      }, {
        where: {
          username,
        },
      }).then(() => {
        socket.join(username);
        socket.emit('logged_in');
      });
    });

    socket.on('disconnect', () => {
      const { username } = socket;
      socket.leave(username);
      socket.emit('logged_out');
      db.User.update({
        isActive: false,
      }, {
        where: {
          username,
        },
      });
    });

    socket.on('send_message', async (payload, cb) => {
      try {
        const [sender] = await Promise.all([
          db.User.findByUsername(socket.username),
        ]);

        await db.chatMessage.create({
          roomId: payload.roomId,
          content: payload.content,
          senderId: sender.id,
        });

        io.to(payload.to).emit('receive_message', payload);

        if (typeof cb === 'function') {
          cb(payload);
        }
      } catch (error) {
        logger.error(`Error send message ${JSON.stringify(error)}`);
      }
    });
  });
}
