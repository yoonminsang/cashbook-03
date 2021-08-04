import { getAccount, removeAccount, setAccount } from '../utils/api/account';
import Observable from '../utils/Observable';
import dateStore from './date';

class Account extends Observable {
  async get({ year, month }) {
    try {
      const {
        data: { data },
      } = await getAccount({
        year,
        month,
      });

      this.setState(data);
    } catch (e) {
      // const {
      //   response: {
      //     data: { message },
      //   },
      // } = e;
      const message = e.response && e.response.data && e.response.data.message;
      if (message) throw new Error(message);
      console.error(e);
    }
  }

  async update() {
    const { year, month } = dateStore.state;
    await this.get({ year, month });
  }

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

      this.update();
    } catch (e) {
      // const {
      //   response: {
      //     data: { message },
      //   },
      // } = e;
      const message = e.response && e.response.data && e.response.data.message;
      if (message) throw new Error(message);
      console.error(e);
    }
  }

  async remove({ account_id }) {
    try {
      const {
        data: { message },
      } = await removeAccount({
        account_id,
      });
      console.log(message);

      this.update();
    } catch (e) {
      // const {
      //   response: {
      //     data: { message },
      //   },
      // } = e;
      const message = e.response && e.response.data && e.response.data.message;
      if (message) throw new Error(message);
      console.error(e);
    }
  }
}

export default new Account();
