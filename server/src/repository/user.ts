import User from '../model/user';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export default class UserRepository {
  async get(id: string) {
    return await User.findByPk(id);
  }

  async getUserForDeserialize(id: string) {
    return await User.findByPk(id, {
      attributes: ['id', 'email', 'nickname'],
    });
  }

  async getByEmail(email: string) {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  }

  async insertUser(email: string, password: string, nickname: string) {
    const id = uuidv4();
    const hash = await bcrypt.hash(password + '', 10);
    return await User.create({
      id,
      email,
      password: hash,
      nickname,
    });
  }
}
