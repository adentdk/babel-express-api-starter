import config from '@config/config';
import * as crypto from 'crypto';

const algorithm = 'aes-256-gcm';
const iterations = 2145;
const keylen = 32;
const digest = 'sha512';
const salt = crypto.randomBytes(64);

export const encrypt = (data, secretKey = config.app_secret_key) => {
  const inputEncoding = 'utf8';
  const outputEncoding = 'base64';

  const iv = crypto.randomBytes(12);

  const key = crypto.pbkdf2Sync(secretKey, salt, iterations, keylen, digest);

  const cipher = crypto.createCipheriv(algorithm, key, iv);

  const enc1 = cipher.update(data, inputEncoding);

  const enc2 = cipher.final();

  const tag = cipher.getAuthTag();

  const encryptedData = Buffer.concat([enc1, enc2, iv, tag]).toString(outputEncoding);

  return encryptedData;
};

export const decrypt = (data, secretKey = config.app_secret_key) => {
  const inputEncoding = 'base64';
  const outputEncoding = 'utf8';

  const bufferData = Buffer.from(data, inputEncoding);

  const key = crypto.pbkdf2Sync(secretKey, salt, iterations, keylen, digest);

  const iv = bufferData.subarray(bufferData.length - 28, bufferData.length - 16);

  const tag = bufferData.subarray(bufferData.length - 16);

  const text = bufferData.subarray(0, bufferData.length - 28);

  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  decipher.setAuthTag(tag);

  let str = decipher.update(text, undefined, outputEncoding);

  str += decipher.final(outputEncoding);

  return str;
};
