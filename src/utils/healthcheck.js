import { Counter } from 'prom-client';
import config from '@config/config';

const serviceHeartbeatCounter = new Counter({
  name: 'service_is_alive',
  help: 'Check if service is working.',
  labelNames: ['alive'],
});

const updateServiceStatus = () => {
  serviceHeartbeatCounter.inc({ alive: config.metrics.dockerHost });
};

const serviceEnv = new Counter({
  name: 'service_environment',
  help: 'Check service environment.',
  labelNames: ['environment'],
});

const serviceVersion = new Counter({
  name: 'service_version',
  help: 'Check service version.',
  labelNames: ['version'],
});

const init = () => {
  serviceVersion.inc({ version: config.metrics.version });
  serviceEnv.inc({ environment: config.node_env });
};

export {
  updateServiceStatus,
  init,
};
