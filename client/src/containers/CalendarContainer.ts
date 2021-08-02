import Calendar from '../components/Calendar/Calendar';
import dateStore from '../store/date';
import View from '../utils/View';

class CalendarContainer extends View {
  state: any;
  Calendar: Function;
  constructor({ $target }) {
    super({ $target });
    this.state = { date: dateStore.state, day: new Date().getDate() };

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

    this.setState(nextState);
  };

  componentDidMount = () => {
    dateStore.subscribe(this.getGlobalState);
  };

  addEventHandler = () => {
    this.$target.addEventListener('click', this.onDateClick);
  };

  onDateClick = (e) => {
    const target = e.target;
    if (!target.closest('.week__day')) return;

    const clickedDate = target.closest('.week__day').dataset.date;

    this.setState({ ...this.state, day: clickedDate });
  };
}
export default CalendarContainer;
