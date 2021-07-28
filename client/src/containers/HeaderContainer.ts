import Header from '../components/Header';
import { GLOBALSTATE, store } from '../store';
import View from '../utils/View';

const identifier = 'header';

class HeaderContainer extends View {
  state: any;
  header: InstanceType<typeof Header>;
  $year: HTMLElement;
  $month: HTMLElement;
  constructor({ $target }) {
    super({ $target });
    this.header = new Header();
    this.$target = $target;
    this.render();
    this.state = { date: undefined, user: undefined };
    this.componentDidMount();
    this.event();
  }

  render = () => {
    this.$target.innerHTML = this.header.render({
      date: this.state?.date,
      user: this.state?.user,
    });
  };

  componentDidMount = () => {
    store.subscribe(GLOBALSTATE.date, identifier, this.setState);
    store.subscribe(GLOBALSTATE.user, identifier, this.setState);
  };

  setState = (type?: string, changeState?: any) => {
    const nextState = { ...this.state };
    nextState[type] = changeState;
    this.state = nextState;
    this.render();
  };

  event = () => {
    this.$target.addEventListener('click', (e) => {});
  };
}
export default HeaderContainer;
