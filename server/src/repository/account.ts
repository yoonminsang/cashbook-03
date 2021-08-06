import { Op, Sequelize, where } from 'sequelize';
import Account from '../model/account';
import Category from '../model/category';
import Payment from '../model/payment';

export default class AccountRepository {
  async getAccountById(userId: string, id: any) {
    return await Account.findOne({
      where: { id },
      raw: true,
      attributes: [
        'id',
        'content',
        'amount',
        [
          Sequelize.fn('date_format', Sequelize.col('timestamp'), '%Y-%m-%d'),
          'timestamp',
        ],
        [Sequelize.col('Category.id'), 'category_id'],
        [Sequelize.col('Category.name'), 'category_name'],
        [Sequelize.col('Category.color'), 'category_color'],
        [Sequelize.col('Category.is_income'), 'is_income'],
        [Sequelize.col('Payment.id'), 'payment_id'],
        [Sequelize.col('Payment.name'), 'payment_name'],
      ],
      include: [
        {
          model: Category,
          attributes: [],
        },
        {
          model: Payment,
          attributes: [],
        },
      ],
    });
  }

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
      attributes: [
        'id',
        'content',
        'amount',
        [
          Sequelize.fn('date_format', Sequelize.col('timestamp'), '%Y-%m-%d'),
          'timestamp',
        ],
        [Sequelize.col('Category.id'), 'category_id'],
        [Sequelize.col('Category.name'), 'category_name'],
        [Sequelize.col('Category.color'), 'category_color'],
        [Sequelize.col('Category.is_income'), 'is_income'],
        [Sequelize.col('Payment.name'), 'payment_name'],
      ],
      order: [
        ['timestamp', 'DESC'],
        ['id', 'DESC'],
      ],
      include: [
        {
          model: Category,
          attributes: [],
        },
        {
          model: Payment,
          attributes: [],
        },
      ],
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

  async updateAccount(
    id: string,
    content: string,
    amount: string,
    timestamp: string,
    category_id: string,
    payment_id: string,
  ) {
    return await Account.update(
      {
        content,
        amount,
        timestamp,
        category_id,
        payment_id,
      },
      {
        where: {
          id,
        },
      },
    );
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
