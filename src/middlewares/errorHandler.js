import { StatusCodes } from 'http-status-codes';
import { inspect as utilInspect } from 'util';
import { logger } from '@utils/logger';
import sendJsonResponse from '@utils/sendResponse';
import config from '@config/config';

export const methodNotAllowed = (req, res) => {
  sendJsonResponse(res, {
    status: StatusCodes.METHOD_NOT_ALLOWED,
  });
};

export const notFound = (req, res) => {
  sendJsonResponse(res, {
    status: StatusCodes.NOT_FOUND,
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
    name: errorObj.name,
    message: errorObj.message,
    status,
    stack: null,
  };

  if (errorObj.fields) {
    payload.data = {
      fields: errorObj.fields,
    };
  }

  if (config.node_env === 'development') {
    payload.stack = errorObj.stack;
  }

  if (errorObj.t) {
    try {
      await errorObj.t.rollback();
    } catch (e) {
      logger.error('ROLLBACK ERROR');
    }
  }

  return sendJsonResponse(res, payload);
};

export default errorHandler;
