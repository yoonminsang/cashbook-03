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

  async postAccount(
    user_id: string,
    content: string,
    amount: string,
    timestamp: string,
    category_id: string,
    payment_id: string,
  ) {
    return await Account.create({
      user_id,
      content,
      amount,
      timestamp,
      category_id,
      payment_id,
    });
  }
}
