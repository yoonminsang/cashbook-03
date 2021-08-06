import {
  getAccount,
  modifyAccount,
  removeAccount,
  setAccount,
} from '../utils/api/account';
import Observable from '../utils/Observable';
import dateStore from './date';

class Account extends Observable {
  async get({ year, month }) {
    const data = await getAccount({
      year,
      month,
    });

    this.setState(data);
  }

  async update() {
    const { year, month } = dateStore.state;
    await this.get({ year, month });
  }

  async add({ content, amount, timestamp, category_id, payment_id }) {
    const setAccountSuccess = await setAccount({
      content,
      amount,
      timestamp,
      category_id,
      payment_id,
    });

    if (setAccountSuccess) this.update();
  }

  async modify({ id, content, amount, timestamp, category_id, payment_id }) {
    const setAccountSuccess = await modifyAccount({
      id,
      content,
      amount,
      timestamp,
      category_id,
      payment_id,
    });

    if (setAccountSuccess) this.update();
  }

  async remove({ account_id }) {
    const removeAccountSuccess = await removeAccount({ account_id });

    if (removeAccountSuccess) this.update();
  }
}

export default new Account();
