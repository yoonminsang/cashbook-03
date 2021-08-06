import Observable from '../utils/Observable';
import { getPayment, setPayment, removePayment } from '../utils/api/payment';

class Payment extends Observable {
  async init() {
    try {
      const data = await getPayment();
      this.setState(data);
    } catch (message) {
      // alert(message);
      return;
    }
  }

  async update() {
    await this.init();
  }

  async add({ name }) {
    try {
      await setPayment({ name });

      this.update();
    } catch (message) {
      // alert(message);
      return;
    }
  }

  async remove({ id }) {
    try {
      await removePayment({ id });

      this.update();
    } catch (message) {
      alert(message);
      return;
    }
  }
}

export default new Payment();
