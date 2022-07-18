import sendJsonResponse from '@utils/sendResponse';
import { Router } from 'express';

const authRouter = () => {
  const router = Router();

  router.route('/login').get((req, res) => {
    sendJsonResponse(res, {
      message: 'Login',
    });
  });

  return router;
};

export default authRouter;
