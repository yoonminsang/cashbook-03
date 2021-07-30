import passport from 'passport';
import Strategy from 'passport-local';
import bcrypt from 'bcrypt';
import UserRepository from '../repository/user';

const LocalStrategy = Strategy.Strategy;
const userRepository = new UserRepository();

export default () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          console.log('local strategy', email);
          const user: any = await userRepository.getByEmail(email);
          if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) return done(null, user);
            return done(null, false);
          }
          return done(null, false);
        } catch (e) {
          console.error('local passport error', e);
        }
      },
    ),
  );
};
