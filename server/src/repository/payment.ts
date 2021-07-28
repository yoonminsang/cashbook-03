import Payment from '../model/payment';

export default class PaymentRepository {
  async getByUserId(userId: string) {
    return await Payment.findAll({
      where: {
        user_id: userId,
      },
    });
  }
}
