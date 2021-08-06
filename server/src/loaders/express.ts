import config from '../config';
import { Express, json } from 'express';
import morgan from 'morgan';
import cors from 'cors';

export default (app: Express) => {
  app.use(morgan(config.mode === 'production' ? 'combined' : 'dev'));
  app.use(json());
  app.use(cors(config.cors));
};
