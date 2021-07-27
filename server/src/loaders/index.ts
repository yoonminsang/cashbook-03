import { Express } from 'express';
import morganLoader from './morgan';

export default (app: Express) => {
  morganLoader(app);
  console.log('morgan loaded');
};
