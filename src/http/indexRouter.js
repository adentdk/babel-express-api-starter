import sendJsonResponse from '@utils/sendResponse';
import { Router } from 'express';

const indexRouter = () => {
  const router = Router();

  router.route('/').get((req, res) => {
    sendJsonResponse(res, {
      message: 'Index',
    });
  });

  return router;
};

export default indexRouter;
