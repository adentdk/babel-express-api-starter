import sendJsonResponse from '@utils/sendResponse';
import { Router } from 'express';
import { methodNotAllowed } from 'src/middlewares/errorHandler';

const authRouter = () => {
  const router = Router();

  router.route('/login').get((req, res) => {
    sendJsonResponse(res, {
      message: 'Login',
    });
  }).all(methodNotAllowed);

  return router;
};

export default authRouter;
