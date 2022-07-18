import { Router } from 'express';
import authRouter from './routes/auth';

const apiV1Router = () => {
  const router = Router();

  router.use('/auth', authRouter());

  return router;
};

export default apiV1Router;
