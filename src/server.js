import http from 'http';
import { logger } from '@utils/logger';
import * as healthcheck from '@utils/healthcheck';
import { start } from './expressFile';
import config from './config/config';
import { initSocket } from './socket';

const app = start(config.node_env);
const server = http.createServer(app);

initSocket(server);

healthcheck.init();

server.listen(Number(config.server.port), () => {
  logger.info('server up and running');
  logger.info(`at: ${config.server.host}:${config.server.port}`);
  logger.info(`as ${config.node_env}`);
});

setInterval(healthcheck.updateServiceStatus, config.metrics.heartbeatInterval);
