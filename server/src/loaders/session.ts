import config from '../config';
import { Express } from 'express';
import session, * as expressSession from 'express-session';
import expressMysqlSession from 'express-mysql-session';
import passport from 'passport';
import passportConfig from '../passport/index';
const MySQLStore = expressMysqlSession(expressSession);

export default (app: Express) => {
  passportConfig();

  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: config.secret!,
      store: new MySQLStore(config.db),
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
