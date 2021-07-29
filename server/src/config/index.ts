import dotenv from 'dotenv';
dotenv.config();

import { corsOptions } from './cors-config';
import { dbOptions } from './db-config';

export default {
  mode: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  cors: corsOptions,
  db: dbOptions,
  secret: process.env.COOKIE_SECRET,
};
