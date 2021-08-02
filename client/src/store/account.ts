import { setAccount } from '../utils/api/account';
import Observable from '../utils/Observable';

class Account extends Observable {
  async get() {}

  async getByCategory() {}

  async add({ content, amount, timestamp, category_id, payment_id }) {
    try {
      const {
        data: { message },
      } = await setAccount({
        content,
        amount,
        timestamp,
        category_id,
        payment_id,
      });
      console.log(message);
    } catch (e) {
      const {
        response: {
          data: { message },
        },
      } = e;
      if (message) throw new Error(message);
      console.error(e);
    }
  }

  async remove({ id }) {}
}

export default new Account();
