import config from '@config/config';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { encrypt } from './crypto';

const sendJsonResponse = (res, {
  status = StatusCodes.OK,
  name = getReasonPhrase(status),
  message,
  data,
  stack,
}) => {
  let payloadResponse = {
    name,
    message,
    data,
    stack,
  };

  if (config.use_encryption) {
    payloadResponse = encrypt(JSON.stringify(payloadResponse));
  }

  res
    .status(status)
    .json(payloadResponse).end();
};

export default sendJsonResponse;
