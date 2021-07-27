import dotenv from 'dotenv';
import corsConfig from './cors-config';
dotenv.config();

export default {
  mode: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  cors: corsConfig,
};
