import config from '../config';
import { Sequelize } from 'sequelize';
import { modelInitFunctions, setRelations } from '../model';

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

  await Promise.all(modelInitFunctions.map((init) => init(sequelize)));
  console.log('All models synchronized & Initialized');

  setRelations();
  await sequelize.sync({ alter: true });
  console.log('Relations Set');
};
