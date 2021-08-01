import PaymentRepository from '../repository/payment';
const paymentRepository = new PaymentRepository();

export const MIN_PAYMENT_NUM = 1;
const INITIAL_PAYMENTS = ['현금', '카드', '이체'];

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

  async deletePayment(userId: string, paymentId: number) {
    if (!paymentId) throw new Error('NO_DATA');

    const payments = (await paymentRepository.getNames(userId)) as any;
    if (payments.length === MIN_PAYMENT_NUM) throw new Error('MIN_PAYMENT_NUM');

    const idNotFound = !payments
      .map((data: any) => data.id)
      .includes(paymentId);
    if (idNotFound) throw new Error('NOT_FOUND');

    try {
      await paymentRepository.deletePayment(userId, paymentId);

      return 'SUCCESS';
    } catch (e) {
      throw e;
    }
  }

  async addInitialPayments(userId: string) {
    const result = await paymentRepository.addInitialPayments(
      userId,
      INITIAL_PAYMENTS,
    );
    if (result.length !== INITIAL_PAYMENTS.length)
      throw new Error('PAYMENT_INIT_FAIL');

    return 'SUCCESS';
  }
}
