import User from '../model/user';
import bcrypt from 'bcryptjs';

export default class UserRepository {
  async get(id: string) {
    return await User.findByPk(id);
  }

  async getUserForDeserialize(id: string) {
    return await User.findByPk(id, {
      attributes: ['id', 'email', 'nickname'],
      raw: true,
    });
  }

  async getByEmail(email: string) {
    return await User.findOne({
      where: {
        email: email,
      },
      raw: true,
    });
  }

  async insertUser(email: string, password: string, nickname: string) {
    const hash = await bcrypt.hash(password, 10);
    return await User.create({
      email,
      password: hash,
      nickname,
    });
  }

  async getByOAuthEmail(email: string, provider: string) {
    const existUser = await User.findOne({
      where: { email, provider },
      raw: true,
    });
    return existUser;
  }

  async insertOAuthUser(email: string, nickname: string, provider: string) {
    return (
      await User.create({
        email,
        nickname,
        provider,
      })
    ).get({ plain: true });
  }
}
