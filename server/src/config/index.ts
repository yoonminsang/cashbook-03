import dotenv from 'dotenv';
dotenv.config();

import { corsOptions } from './cors-config';
import { dbOptions } from './db-config';
import { redisOptions } from './redis-config';

export default {
  mode: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  cors: corsOptions,
  db: dbOptions,
  secret: process.env.COOKIE_SECRET,
  clientID: process.env.ClientId,
  clientSecret: process.env.ClientSecret,
  frontUrl: process.env.FRONT_URL,
  redis: redisOptions,
};
