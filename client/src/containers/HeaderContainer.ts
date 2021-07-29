import Header from '../components/Header/Header';
import { GLOBALSTATE, store } from '../store';
import View from '../utils/View';

const IDENTIFIER = 'header';

class HeaderContainer extends View {
  state: any;
  Header: Function;
  $year: HTMLElement;
  $month: HTMLElement;
  constructor({ $target }) {
    super({ $target });
    this.Header = Header;
    this.$target = $target;
    this.state = { date: undefined, user: undefined };
    this.render();
    this.componentDidMount();
    this.addEventHandler();
  }

  render = () => {
    this.$target.innerHTML = this.Header({
      date: this.state?.date,
      user: this.state?.user,
    });
  };

  componentDidMount = () => {
    store.subscribe(GLOBALSTATE.date, IDENTIFIER, this.setState);
    store.subscribe(GLOBALSTATE.user, IDENTIFIER, this.setState);
  };

  setState = (type?: string, changeState?: any) => {
    const nextState = { ...this.state };
    nextState[type] = changeState;
    this.state = nextState;
    this.render();
  };

  addEventHandler = () => {
    this.$target.addEventListener('click', (e) => {});
  };
}
export default HeaderContainer;
