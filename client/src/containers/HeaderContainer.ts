import Header from '../components/Header/Header';
import dateStore from '../store/date';
import userStore from '../store/user';
import { logout } from '../utils/api/auth';
import View from '../utils/View';

class HeaderContainer extends View {
  state: any;
  Header: Function;
  constructor({ $target }) {
    super({ $target });
    this.Header = Header;
    this.state = {
      date: dateStore.state,
      user: userStore.state,
      tab: location.pathname,
    };
    this.render();
    this.componentDidMount();
    this.addEventHandler();
  }

  markup = () => {
    return this.Header(this.state);
  };

  getGlobalState = () => {
    const nextState = { ...this.state };
    nextState.date = dateStore.state;
    nextState.user = userStore.state;
    this.setState(nextState);
  };

  componentDidMount = () => {
    dateStore.subscribe(this.getGlobalState);
    userStore.subscribe(this.getGlobalState);
  };

  addEventHandler = () => {
    this.$target.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('.change-month')) {
        this.onMonthChangeClick(target);
      } else if (target.closest('.js-logout')) {
        this.logoutHandler();
      }
    });
  };

  onMonthChangeClick = async (target) => {
    const isPrev = target.closest('.main-header__time__left') ? true : false;

    dateStore.setState(
      this.getYearMonth(
        parseInt(this.state.date.year),
        parseInt(this.state.date.month),
        isPrev,
      ),
    );
  };

  logoutHandler = async () => {
    const logoutSuccess = await logout();

    if (logoutSuccess) {
      localStorage.removeItem('user');
      location.href = '/';
    }
  };

  getYearMonth = (year: number, month: number, isPrev: boolean) => {
    const result = new Date(year, isPrev ? month - 2 : month);

    return { year: result.getFullYear(), month: result.getMonth() + 1 };
  };
}
export default HeaderContainer;
