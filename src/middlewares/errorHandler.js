import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { inspect as utilInspect } from 'util';
import { logger } from '@utils/logger';

export const methodNotAllowed = (req, res, next) => {
  next({
    statusCode: StatusCodes.METHOD_NOT_ALLOWED,
  });
};

export const notFound = (req, res, next) => {
  next({
    statusCode: StatusCodes.NOT_FOUND,
  });
};

const errorHandler = async (error, req, res) => {
  const errorObj = error || {};
  const status = errorObj.status || StatusCodes.INTERNAL_SERVER_ERROR;

  logger.error(`
      REQUEST HANDLING ERROR:
      ERROR:
      -> ${JSON.stringify(errorObj.message)}
      REQUEST HEADER:
      -> ${utilInspect(req.headers)}
      REQUEST PARAMS:
      -> ${utilInspect(req.params)}
      REQUEST QUERY:
      -> ${utilInspect(req.query)}
      BODY: ${utilInspect(req.body)}
    `);

  const payload = {
    fields: errorObj.fields,
    message: errorObj.message,
    name: errorObj.name || getReasonPhrase(status),
    status,
    stack: null,
  };

  if (process.env.NODE_ENV === 'development') {
    payload.stack = errorObj.stack;
  }

  if (errorObj.t) {
    try {
      await errorObj.t.rollback();
    } catch (e) {
      logger.error('ROLLBACK ERROR');
    }
  }

  return res.status(status).json(payload).end();
};

export default errorHandler;
