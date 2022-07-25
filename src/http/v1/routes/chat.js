import { Router } from 'express';
import { methodNotAllowed } from '@middlewares/errorHandler';
import * as chatControllers from '@controller-v1/chat';
import mustAuthenticatedHeaderJwt from '@middlewares/mustAuthenticatedJwt';
import yupvalidate from '@middlewares/yupvalidate';

const chatRouter = () => {
  const router = Router();

  router
    .route('/rooms')
    .get(
      mustAuthenticatedHeaderJwt,
      chatControllers.getRoomList,
    )
    .post(
      mustAuthenticatedHeaderJwt,
      yupvalidate(chatControllers.createRoomSchema),
      chatControllers.createRoom,
    )
    .all(methodNotAllowed);

  router
    .route('/rooms/:roomId/messages')
    .get(
      mustAuthenticatedHeaderJwt,
      chatControllers.getRoomMessages,
    )
    .all(methodNotAllowed);

  return router;
};

export default chatRouter;
