import dotenv from 'dotenv';
import { corsOptions } from './cors-config';
dotenv.config();

export default {
  mode: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  cors: corsOptions,
};
