import { logger } from '@utils/logger';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import apiV1Router from './http/v1';
import indexRouter from './http/indexRouter';
import errorHandler, { notFound } from './middlewares/errorHandler';
// import swaggerUi from 'swagger-ui-express';

export function start(env) {
  logger.debug(`App running as ${env}`);
  const app = express();

  app.use(cors());

  // morgan logger request response
  app.use(morgan('combined', { stream: logger.morgan }));

  // Public File
  app.use('/public', express.static('public'));

  // BODY PARSER MIDDLEWARE
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // API BEGIN
  app.use('/', indexRouter());
  app.use('/api/v1', apiV1Router());

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

export default start;
