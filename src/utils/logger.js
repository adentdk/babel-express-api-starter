import winston from 'winston';

const { format } = winston;
const custom = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
    http: 5,
  },
  colors: {
    error: 'red',
    warn: 'orange',
    info: 'white bold yellow',
    verbose: 'blue',
    debug: 'green',
    http: 'pink',
  },
};
const { NODE_ENV } = process.env;

winston.addColors(custom.colors);
export const myFormat = format.printf(
  (info) => `[${info.timestamp}] [${info.level}] => ${info.message}`,
);

export const logger = winston.createLogger({
  levels: custom.levels,
  level: NODE_ENV === 'production' ? 'error' : 'debug',
  format: format.combine(
    format.timestamp(),
    format.json(),
    myFormat,
  ),

  transports: [
    new winston.transports.File({ filename: 'info.log', level: 'debug' }),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.Console({
      level: NODE_ENV === 'production' ? 'error' : 'debug',
    }),
  ],
});

logger.morgan = {
  write(message) {
    // eslint-disable-next-line no-console
    console.log(message);
  },
};
