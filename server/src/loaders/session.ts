import config from '../config';
import { Express } from 'express';
import session from 'express-session';
import passport from 'passport';
import passportConfig from '../passport/index';
import redis from 'redis';
import connectRedis from 'connect-redis';
const RedisStore = connectRedis(session);
const redisOptions = config.redis;

const redisClient = redis.createClient(+redisOptions.port, redisOptions.host);
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
      store: new RedisStore({ client: redisClient, ttl: 1000 * 60 * 60 * 24 }),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
};
