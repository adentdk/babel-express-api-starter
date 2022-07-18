import { Router } from 'express';
import { methodNotAllowed } from '@middlewares/errorHandler';
import * as authControllers from '@controller-v1/auth';
import yupvalidate from '@middlewares/yupvalidate';

const authRouter = () => {
  const router = Router();

  router
    .route('/login')
    .post(
      yupvalidate(authControllers.loginSchema),
      authControllers.login,
    )
    .all(methodNotAllowed);

  router
    .route('/register')
    .post(
      yupvalidate(authControllers.registerSchema),
      authControllers.register,
    )
    .all(methodNotAllowed);

  return router;
};

export default authRouter;
