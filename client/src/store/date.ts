import Observable from '../utils/Observable';

class CurrentDate extends Observable {
  init() {
    const today = new Date();

    this.setState({
      year: today.getFullYear(),
      month: today.getMonth() + 1,
    });
  }
}

export default new CurrentDate();
