import { Express } from 'express';
import expressLoader from './express';

export default (app: Express) => {
  expressLoader(app);
  console.log('Express Initialized');
};
