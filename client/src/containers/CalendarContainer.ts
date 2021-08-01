import Calendar from '../components/Calendar/Calendar';
import { GLOBALSTATE, store } from '../store';
import View from '../utils/View';

const IDENTIFIER = 'calendar';

class CalendarContainer extends View {
  state: any;
  Calendar: Function;
  constructor({ $target }) {
    super({ $target });
    this.$target = $target;
    this.state = { date: undefined };

    this.Calendar = Calendar;
    this.render();

    // this.componentDidMount();
    // this.addEventHandler();
  }

  render = () => {
    this.$target.innerHTML = this.Calendar(this.state);
  };

  componentDidMount = () => {
    store.subscribe(GLOBALSTATE.date, IDENTIFIER, this.setState);
  };

  setState = (type: string, changeState: any) => {
    const nextState = { ...this.state };
    nextState[type] = changeState;
    this.state = nextState;
    this.render();
  };

  addEventHandler = () => {};
}
export default CalendarContainer;
