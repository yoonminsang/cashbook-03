import Observable from '../utils/Observable';
import { check } from '../utils/api/auth';

class User extends Observable {
  async init() {
    try {
      const {
        data: { user },
      } = await check();
      this.setState(user);
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

export default new User();
