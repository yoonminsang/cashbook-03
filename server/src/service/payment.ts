import PaymentRepository from '../repository/payment';

const paymentRepository = new PaymentRepository();

export default class PaymentService {
  async getPaymentNames(userId: string) {
    const payments = await paymentRepository.getNames(userId);
    if (!payments.length) throw new Error('NO_DATA');

    return payments;
  }

  async addPayment(userId: string, addName: string) {
    if (!addName) throw new Error('NO_DATA');

    const payments = (await paymentRepository.getNames(userId)) as any;

    const hasDuplicateName = payments
      .map((data: any) => data.name)
      .includes(addName);
    if (hasDuplicateName) throw new Error('DUPLICATE');

    try {
      await paymentRepository.addNewPayment(userId, addName);

      return 'SUCCESS';
    } catch (e) {
      throw e;
    }
  }
}
