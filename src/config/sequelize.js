const dotenv = require('dotenv');
const path = require('path');

let envPath = path.join(__dirname, './../../.env');

if (process.env.APP_ENV) {
  envPath += `.${process.env.APP_ENV}`;
}

dotenv.config({
  path: envPath,
});

const {
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  DB_DIALECT,
  DATABASE_URL,
} = process.env;

module.exports = {
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  dialect: DB_DIALECT,
  host: DB_HOST,
  port: DB_PORT,
  url: DATABASE_URL,
};
