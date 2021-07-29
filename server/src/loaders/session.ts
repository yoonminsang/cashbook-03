import config from '../config';
import { Express } from 'express';
import session from 'express-session';
import passport from 'passport';
import passportConfig from '../passport/index';

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
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
};
