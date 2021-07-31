import Payment from '../model/payment';

export default class PaymentRepository {
  async getNames(userId: string) {
    return await Payment.findAll({
      where: {
        user_id: userId,
      },
      attributes: ['id', 'name'],
      raw: true,
    });
  }

  async addNewPayment(userId: string, name: string) {
    return await Payment.create({
      user_id: userId,
      name,
    });
  }
}
