import PaymentRepository from '../repository/payment';

const paymentRepository = new PaymentRepository();

export default class PaymentService {
  async getPaymentNames(userId: string) {
    const payments = await paymentRepository.getNames(userId);
    if (!payments.length) throw new Error('NO_DATA');

    return payments;
  }

  async addPayment(userId: string, name: string) {
    if (!name) throw new Error('NO_DATA');

    try {
      await paymentRepository.addNewPayment(userId, name);

      return 'SUCCESS';
    } catch (e) {
      throw e;
    }
  }
}
