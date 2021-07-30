import config from '../config';
import passport from 'passport';
import Strategy from 'passport-github2';
import UserRepository from '../repository/user';

const GitHubStrategy = Strategy.Strategy;
const userRepository = new UserRepository();

const GITHUB = 'github';
export default () => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: config.clientID!,
        clientSecret: config.clientSecret!,
        scope: ['user:email'],
        callbackURL: '/api/auth/github/callback',
      },
      async (accessToken: any, refreshToken: any, profile: any, done: any) => {
        try {
          const email = profile.emails[0].value;
          const nickname = profile.username;
          const exUser = await userRepository.getByOAuthEmail(email, GITHUB);

          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await userRepository.insertOAuthUser(
              email,
              nickname,
              GITHUB,
            );
            done(null, newUser);
          }
        } catch (e) {
          console.error('github passport error', e);
        }
      },
    ),
  );
};
