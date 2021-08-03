import Calendar from '../components/Calendar/Calendar';
import dateStore from '../store/date';
import accountStore from '../store/account';
import View from '../utils/View';

class CalendarContainer extends View {
  state: any;
  Calendar: Function;
  constructor({ $target }) {
    super({ $target });
    this.state = { date: dateStore.state, account: accountStore.state };

    this.Calendar = Calendar;
    this.render();

    this.componentDidMount();
    this.addEventHandler();
  }

  markup = () => {
    return this.Calendar(this.state);
  };

  getGlobalState = () => {
    const nextState = { ...this.state };
    nextState.date = dateStore.state;
    nextState.account = accountStore.state;

    this.setState(nextState);
  };

  componentDidMount = () => {
    accountStore.subscribe(this.getGlobalState);
  };

  addEventHandler = () => {};
}
export default CalendarContainer;
