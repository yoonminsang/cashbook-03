import { Op } from 'sequelize';
import Account from '../model/account';

export default class AccountRepository {
  async getByMonth(userId: string, thisMonth: Date, nextMonth: Date) {
    return await Account.findAll({
      where: {
        user_id: userId,
        timestamp: {
          [Op.gte]: thisMonth,
          [Op.lt]: nextMonth,
        },
      },
    });
  }
}
