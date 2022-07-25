import { Router } from 'express';
import authRouter from './routes/auth';
import chatRouter from './routes/chat';

const apiV1Router = () => {
  const router = Router();

  router.use('/auth', authRouter());
  router.use('/chat', chatRouter());

  return router;
};

export default apiV1Router;
