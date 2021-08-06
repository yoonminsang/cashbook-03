import Calendar from '../components/Calendar/Calendar';
import CalendarAccountList from '../components/CalendarAccountList/CalendarAccountList';
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
    accountStore.subscribe(this.clearAccounts);
  };

  addEventHandler = () => {
    this.$target.addEventListener('click', this.showAccounts);
  };

  showAccounts = (e: Event) => {
    const $target = e.target as HTMLElement;
    if (!$target.closest('.week__day')) return;

    const $date = $target
      .closest('.week__day')
      .querySelector('.week__day__date') as HTMLElement;
    if (!$date) return;

    this.clearAccounts();

    const { year, month } = this.state.date;
    this.$target.insertAdjacentHTML(
      'beforeend',
      CalendarAccountList(
        this.state.account,
        year,
        month,
        parseInt($date.dataset.date),
      ),
    );

    this.$target
      .querySelector('.stat-account')
      .scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  clearAccounts = () => {
    document.querySelector('.stat-account')?.remove();
  };
}
export default CalendarContainer;
