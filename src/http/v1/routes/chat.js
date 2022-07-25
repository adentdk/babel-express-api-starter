import { Router } from 'express';
import { methodNotAllowed } from '@middlewares/errorHandler';
import * as chatControllers from '@controller-v1/chat';
import mustAuthenticatedHeaderJwt from '@middlewares/mustAuthenticatedJwt';

const chatRouter = () => {
  const router = Router();

  router
    .route('/rooms')
    .get(
      mustAuthenticatedHeaderJwt,
      chatControllers.getRoomList,
    )
    .all(methodNotAllowed);

  return router;
};

export default chatRouter;
