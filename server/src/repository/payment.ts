import Payment from '../model/payment';

export default class PaymentRepository {
  async getNames(userId: string) {
    return (
      await Payment.findAll({
        where: {
          user_id: userId,
        },
        attributes: ['id', 'name'],
      })
    ).map((result) => result.get({ plain: true }));
  }

  async addNewPayment(userId: string, name: string) {
    return await Payment.create({
      user_id: userId,
      name,
    });
  }

  async deletePayment(userId: string, paymentId: number) {
    return await Payment.destroy({
      where: {
        user_id: userId,
        id: paymentId,
      },
    });
  }

  async addInitialPayments(userId: string, initialPayments: string[]) {
    return await Promise.all(
      initialPayments
        .map((name) => Payment.build({ user_id: userId, name }))
        .map((payment) => payment.save()),
    );
  }
}
