import { StatusCodes } from 'http-status-codes';
import { logger } from '@utils/logger';
import sendJsonResponse from '@utils/sendResponse';
import config from '@config/config';

export const methodNotAllowed = (req, res, next) => next({
  status: StatusCodes.METHOD_NOT_ALLOWED,
});

export const notFound = (req, res, next) => next({
  status: StatusCodes.NOT_FOUND,
});

const errorHandler = async (error, req, res, next) => {
  if (error) {
    const errorObj = error;
    const status = errorObj.status || StatusCodes.INTERNAL_SERVER_ERROR;
    const payload = {
      name: errorObj.name,
      message: errorObj.message,
      data: errorObj.data,
      status,
      stack: null,
    };

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
  }

  return next();
};

export default errorHandler;
