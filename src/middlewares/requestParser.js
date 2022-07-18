import { StatusCodes } from 'http-status-codes';

const requestParser = (keys = []) => (req, res, next) => {
  const errorParse = [];
  keys.forEach((key) => {
    if (req.body[key]) {
      try {
        req.body[key] = JSON.parse(req.body[key]);
      } catch (error) {
        errorParse.push(key);
      }
    }

    if (req.query[key]) {
      try {
        req.query[key] = JSON.parse(req.query[key]);
      } catch (error) {
        errorParse.push(key);
      }
    }
  });

  if (errorParse.length) {
    const error = {
      status: StatusCodes.UNPROCESSABLE_ENTITY,
      fields: errorParse.map((key) => ({
        name: key,
        message: 'Invalid value',
      })),
    };

    return next(error);
  }

  return next();
};

export default requestParser;
