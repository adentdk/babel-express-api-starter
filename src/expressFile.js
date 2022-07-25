import { logger } from '@utils/logger';
import cors from 'cors';
import { static as expressStatic, json, urlencoded } from 'express';
import morgan from 'morgan';
import apiV1Router from './http/v1';
import indexRouter from './http/indexRouter';
import errorHandler, { notFound } from './middlewares/errorHandler';
// import swaggerUi from 'swagger-ui-express';

export function start(app, env) {
  logger.debug(`App running as ${env}`);
  app.use(cors());

  // morgan logger request response
  app.use(morgan('combined', { stream: logger.morgan }));

  // Public File
  app.use('/public', expressStatic('public'));

  // BODY PARSER MIDDLEWARE
  app.use(json());
  app.use(urlencoded({ extended: true }));

  // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // API BEGIN
  app.use('/', indexRouter());
  app.use('/api/v1', apiV1Router());

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

export default start;
