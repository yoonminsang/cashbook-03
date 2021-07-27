import { Express } from 'express';
import morgan from 'morgan';

export default (app: Express) => {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
};
