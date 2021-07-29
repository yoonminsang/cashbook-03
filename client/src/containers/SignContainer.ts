import SignHeader from '../components/SignHeader/SignHeader';
import SignMain from '../components/SignMain/SignMain';
import { GLOBALSTATE, store } from '../store';
import View from '../utils/View';

const IDENTIFIER = 'login';

class SignContainer extends View {
  Header: Function;
  Main: Function;
  isSignup: boolean;
  state: any;
  constructor({ $target, isSignup }) {
    super({ $target });
    this.Header = SignHeader;
    this.Main = SignMain;
    this.isSignup = isSignup;
    this.state = { user: undefined };
    this.$target = $target;
    this.render();
    this.componentDidMount();
    // this.addEventHandler();
  }

  render = () => {
    if (this.state.user === undefined) {
      this.$target.innerHTML = '<div>로딩 중...</div>';
      return;
    }

    if (this.state.user) {
      location.href = '/';
      return;
    }

    this.$target.innerHTML = this.Header() + this.Main(this.isSignup);
  };

  componentDidMount = () => {
    store.subscribe(GLOBALSTATE.user, IDENTIFIER, this.setState);
  };

  setState = (type?: string, changeState?: any) => {
    const nextState = { ...this.state };
    nextState[type] = changeState;
    this.state = nextState;
    this.render();
  };

  // addEventHandler = () => {};
}
export default SignContainer;
