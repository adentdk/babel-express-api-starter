import config from '@config/config';
import { verify } from 'jsonwebtoken';

const mustAuthenticatedJwt = async (socket, next) => {
  const { auth } = socket.handshake;
  try {
    if (auth) {
      const { token } = auth;
      const decodedToken = verify(token, config.jwt.secretKey);

      const { username } = decodedToken;
      // eslint-disable-next-line no-param-reassign
      socket.username = username;
      return next();
    }

    throw new Error('ERROR');
  } catch (error) {
    return next(new Error('Invalid authentication'));
  }
};

export default mustAuthenticatedJwt;
