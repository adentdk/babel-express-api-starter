import { Router } from 'express';
import { methodNotAllowed } from '@middlewares/errorHandler';
import * as chatControllers from '@controller-v1/chat';

const chatRouter = () => {
  const router = Router();

  router
    .route('/rooms')
    .get(
      chatControllers.getRoomList,
    )
    .all(methodNotAllowed);

  return router;
};

export default chatRouter;
