import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
  origin: process.env.FRONT_URL,
  credentials: true,
};
