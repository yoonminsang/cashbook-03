import config from '../config';
import { Sequelize } from 'sequelize';

const dbOptions = config.db;

export const sequelizeLoader = async function () {
  const sequelize = new Sequelize(
    dbOptions.name,
    dbOptions.user,
    dbOptions.password,
    {
      host: dbOptions.host,
      dialect: 'mysql',
    },
  );

  try {
    await sequelize.authenticate();
    console.log('Sequelize connection success');
  } catch (err) {
    console.error('Unable to connect to the database', err);
  }
};
