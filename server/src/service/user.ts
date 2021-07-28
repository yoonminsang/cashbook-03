import UserRepository from '../repository/user';

const userRepository = new UserRepository();

export default class CategoryService {
  async getUserById(id: string) {
    const user = await userRepository.get(id);
    if (!user) throw new Error('NO_DATA');

    return user;
  }
}
