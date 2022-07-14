import { Counter } from 'prom-client';
import os from 'os';

const hostname = os.hostname();
const version = process.env.npm_package_version;
const env = process.env.NODE_ENV;

const serviceHeartbeatCounter = new Counter({
  name: 'service_is_alive',
  help: 'Check if service is working.',
  labelNames: ['alive'],
});

const updateServiceStatus = () => {
  serviceHeartbeatCounter.inc({ alive: hostname });
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
  serviceVersion.inc({ version });
  serviceEnv.inc({ environment: env });
};

export {
  updateServiceStatus,
  init,
};
