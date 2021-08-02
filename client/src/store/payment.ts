import Observable from '../utils/Observable';
import { getPayment, setPayment, removePayment } from '../utils/api/payment';

class Payment extends Observable {
  async init() {
    try {
      const {
        data: { data },
      } = await getPayment();

      this.setState(data);
    } catch (e) {
      const {
        response: {
          data: { message },
        },
      } = e;
      if (message) console.error(message);
      console.error(e);
    }
  }

  async update() {
    console.log('re-fetching payment..');
    await this.init();
  }

  async add({ name }) {
    try {
      const {
        data: { message },
      } = await setPayment({ name });

      console.log(message);
      this.update();
    } catch (e) {
      const {
        response: {
          data: { message },
        },
      } = e;
      if (message) console.log(message);
      console.error(e);
    }
  }

  async remove({ id }) {
    try {
      const {
        data: { message },
      } = await removePayment({ id });

      console.log(message);
      this.update();
    } catch (e) {
      const {
        response: {
          data: { message },
        },
      } = e;
      if (message) console.log(message);
      console.error(e);
    }
  }
}

export default new Payment();
