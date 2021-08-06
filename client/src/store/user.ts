import Observable from '../utils/Observable';
import { check } from '../utils/api/auth';

class User extends Observable {
  async init() {
    const user = await check();
    this.setState(user);
  }
}

export default new User();
