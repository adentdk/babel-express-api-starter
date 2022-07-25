import http from 'http';
import { logger } from '@utils/logger';
import * as healthcheck from '@utils/healthcheck';
import express from 'express';

import { start } from './expressFile';

import config from './config/config';
import { initSocket } from './socket';

const app = express();
const server = http.createServer(app);

const io = initSocket(server);

app.use((req, res, next) => {
  res.io = io;

  next();
});

start(app, config.node_env);

healthcheck.init();

server.listen(Number(config.server.port), () => {
  logger.info('server up and running');
  logger.info(`at: ${config.server.host}:${config.server.port}`);
  logger.info(`as ${config.node_env}`);
});

setInterval(healthcheck.updateServiceStatus, config.metrics.heartbeatInterval);
