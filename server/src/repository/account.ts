import { Op } from 'sequelize';
import Account from '../model/account';

export default class AccountRepository {
  async getAccounts(userId: string, startDate: Date, endDate: Date) {
    return await Account.findAll({
      where: {
        user_id: userId,
        timestamp: {
          [Op.gte]: startDate,
          [Op.lt]: endDate,
        },
      },
      raw: true,
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

  async deleteAccount(userId: string, accountId: string) {
    return await Account.destroy({
      where: {
        user_id: userId,
        id: accountId,
      },
    });
  }
}
