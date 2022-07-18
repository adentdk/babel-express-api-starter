import os from 'os';
import * as dotenv from 'dotenv';
import { join } from 'path';
import firebaseServiceAccount from './firebaseServiceAccount.json';

let envPath = join(__dirname, './../../.env');

if (process.env.APP_ENV) {
  envPath += `.${process.env.APP_ENV}`;
}

dotenv.config({
  path: envPath,
});

const {
  APP_ENV,
  npm_package_version: NPM_PACKAGE_VERSION,
  NODE_ENV,
  APP_SECRET_KEY,
  USE_ENCRYPTION,
  SERVICE_PORT,
  SERVICE_HOST = '0.0.0.0',
  USE_FIREBASE,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  HEALTHCHECK_HEARTBEAT_INTERVAL,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  DATABASE_URL,
  JWT_SECRET,
  JWT_EXPIRED_IN,
  JWT_REFRESH_EXPIRED_IN,
  JWT_REFRESH_SECRET,
  WEB_SOCKET_PATH,
  WEB_SOCKET_SERVER_PATH,
  WEB_SOCKET_SERVER_KEY,
} = process.env;

let isUseFirebase = false;
let isUseEncryption = false;

try {
  isUseFirebase = JSON.parse(USE_FIREBASE);
} catch (error) {
  //
}

try {
  isUseEncryption = JSON.parse(USE_ENCRYPTION);
} catch (error) {
  //
}

export default {
  app_env: APP_ENV,
  node_env: NODE_ENV,
  use_encryption: isUseEncryption,
  app_secret_key: APP_SECRET_KEY,
  firebase: {
    enable: isUseFirebase,
    serviceAccount: firebaseServiceAccount,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
  },
  server: {
    host: SERVICE_HOST,
    port: SERVICE_PORT,
  },
  metrics: {
    heartbeatInterval: Number(HEALTHCHECK_HEARTBEAT_INTERVAL),
    commitSha: 'manual-build',
    dockerHost: os.hostname(),
    version: NPM_PACKAGE_VERSION,
  },
  db: {
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    url: DATABASE_URL,
  },
  jwt: {
    secretKey: JWT_SECRET,
    expiresIn: JWT_EXPIRED_IN,
    refreshExpiresIn: JWT_REFRESH_EXPIRED_IN,
    refreshSecretKey: JWT_REFRESH_SECRET,
  },
  websocket: {
    path: WEB_SOCKET_PATH,
    path_admin: WEB_SOCKET_SERVER_PATH,
    serverKey: WEB_SOCKET_SERVER_KEY,
  },
};
