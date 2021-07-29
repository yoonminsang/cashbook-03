import { Express } from 'express';
import { sequelizeLoader } from './sequelize';
import expressLoader from './express';
import session from './session';

export default async (app: Express) => {
  await sequelizeLoader();
  console.log('Sequelize Initialized');

  expressLoader(app);
  console.log('Express Initialized');

  session(app);
  console.log('Session and Passport Initialized');
};
