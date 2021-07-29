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
        callbackURL: 'http://localhost:3000/api/auth/github/callback',
      },
      async (accessToken: any, refreshToken: any, profile: any, done: any) => {
        try {
          console.log('profile', profile);
          const email = profile.emails[0].value;
          const nickname = profile.username;
          console.log(email, nickname);
          const exUser = await userRepository.getByOAuthEmail(email, GITHUB);
          console.log(exUser);
          if (exUser!) {
            done(null, exUser!);
          } else {
            const newUser = await userRepository.insertOAuthUser(
              email,
              nickname,
              GITHUB,
            );
            console.log(newUser);
            done(null, newUser);
          }
        } catch (e) {
          console.error('github passport error', e);
        }
      },
    ),
  );
};
