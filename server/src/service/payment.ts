import PaymentRepository from '../repository/payment';

const paymentRepository = new PaymentRepository();

export default class PaymentService {
  async getPayments(userId: string) {
    const payments = await paymentRepository.getByUserId(userId);
    if (!payments.length) throw new Error('NO_DATA');

    return payments;
  }
}
