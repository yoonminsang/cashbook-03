import passport from 'passport';
import UserRepository from '../repository/user';
import local from './local';

const passportConfig = () => {
  passport.serializeUser((user: any, done) => {
    console.log('serialize', user.id);
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    const userRepository = new UserRepository();
    const user = await userRepository.getUserForDeserialize(id);
    console.log('deserialize', user);
    done(null, user);
  });

  local();
};
export default passportConfig;
