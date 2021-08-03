import config from '../config';
import { Express } from 'express';
import session from 'express-session';
import passport from 'passport';
import passportConfig from '../passport/index';
import redis from 'redis';
import connectRedis from 'connect-redis';
const RedisStore = connectRedis(session);
const redisOption = config.redis;

const redisClient = redis.createClient({
  url: `redis://${redisOption.host}:${redisOption.port}`,
  password: redisOption.password,
});
export default (app: Express) => {
  passportConfig();

  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: config.secret!,
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24, // 1일
      },
      name: 'baemin-cookie',
      store: new RedisStore({ client: redisClient }),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
};
