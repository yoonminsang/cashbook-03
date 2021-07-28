import User from '../model/user';

export default class UserRepository {
  async get(id: string) {
    return await User.findByPk(id);
  }
}
