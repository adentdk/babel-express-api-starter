import config from '@config/config';
import { StatusCodes } from 'http-status-codes';
import { verify } from 'jsonwebtoken';

const mustAuthenticatedHeaderJwt = (req, res, next) => {
  let token = '';

  try {
    token = req.headers.authorization.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }
  } catch (error) {
    next({
      status: StatusCodes.UNAUTHORIZED,
      message: 'no authorization header',
    });
  }

  try {
    const decodedToken = verify(token, config.jwt.secretKey);

    req.auth = decodedToken;
  } catch (error) {
    next({
      status: StatusCodes.UNAUTHORIZED,
      message: error.message,
    });
  }
};

export default mustAuthenticatedHeaderJwt;
