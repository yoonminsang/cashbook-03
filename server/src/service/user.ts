import UserRepository from '../repository/user';

const userRepository = new UserRepository();

export default class UserService {
  async getUserById(id: string) {
    const user = await userRepository.get(id);
    if (!user) throw new Error('NO_DATA');

    return user;
  }

  async signUp(email: string, password: string, nickname: string) {
    const existEmail = await userRepository.getEmail(email);
    if (existEmail) throw new Error('EMAIL_DUPLICATE');
    await userRepository.insertUser(email, password, nickname);

    return 'singup success';
  }
}
