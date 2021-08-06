import Observable from '../utils/Observable';
import { getCategory } from '../utils/api/category';

class Category extends Observable {
  async init() {
    try {
      const data = await getCategory();
      this.setState(data);
    } catch (message) {
      // alert(message);
      return;
    }
  }
}

export default new Category();
