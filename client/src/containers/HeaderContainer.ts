import Header from '../components/Header/Header';
import { GLOBALSTATE, store } from '../store';
import { logout } from '../utils/api/auth';
import View from '../utils/View';

const IDENTIFIER = 'header';

class HeaderContainer extends View {
  state: any;
  Header: Function;
  constructor({ $target }) {
    super({ $target });
    this.Header = Header;
    this.$target = $target;
    this.state = { date: undefined, user: undefined, tab: location.pathname };
    this.render();
    this.componentDidMount();
    this.addEventHandler();
  }

  render = () => {
    this.$target.innerHTML = this.Header(this.state);
  };

  componentDidMount = () => {
    store.subscribe(GLOBALSTATE.date, IDENTIFIER, this.setState);
    store.subscribe(GLOBALSTATE.user, IDENTIFIER, this.setState);
  };

  setState = (type: string, changeState: any) => {
    const nextState = { ...this.state };
    nextState[type] = changeState;
    this.state = nextState;
    this.render();
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

    store.setState(
      GLOBALSTATE.date,
      this.getYearMonth(
        parseInt(this.state.date.year),
        parseInt(this.state.date.month),
        isPrev,
      ),
    );
  };

  logoutHandler = async () => {
    try {
      const {
        data: { message },
      } = await logout();
      console.log(message);

      location.href = '/';
    } catch (e) {
      const {
        response: {
          data: { message },
        },
      } = e;
      if (message) throw new Error(message);
      console.error(e);
    }
  };

  getYearMonth = (year: number, month: number, isPrev: boolean) => {
    const result = new Date(year, isPrev ? month - 2 : month);

    return { year: result.getFullYear(), month: result.getMonth() + 1 };
  };
}
export default HeaderContainer;
