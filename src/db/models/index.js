/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import * as fs from 'fs';
import * as path from 'path';

import Sequelize from 'sequelize';
import appConfig from '@config/config';

const basename = path.basename(__filename);

let sequelize;
if (appConfig.db.url) {
  sequelize = new Sequelize(
    appConfig.db.url,
    appConfig.db,
  );
} else {
  sequelize = new Sequelize(
    appConfig.db.database,
    appConfig.db.user,
    appConfig.db.password,
    appConfig.db,
  );
}

const db = {};

// auto import models from models folder
fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const modelFile = require(path.join(__dirname, file)).default;
    if (typeof modelFile === 'function') {
      const model = modelFile(sequelize);

      db[model.name] = model;
    }
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

export default db;
