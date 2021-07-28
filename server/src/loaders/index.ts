import { Express } from 'express';
import { sequelizeLoader } from './sequelize';
import expressLoader from './express';

export default async (app: Express) => {
  await sequelizeLoader();
  console.log('Sequelize Initialized');

  expressLoader(app);
  console.log('Express Initialized');
};
