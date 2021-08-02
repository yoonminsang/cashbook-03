import Observable from '../utils/Observable';
import { getCategory } from '../utils/api/category';

class Payment extends Observable {
  async init() {
    try {
      const {
        data: { data },
      } = await getCategory();

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
}

export default new Payment();
