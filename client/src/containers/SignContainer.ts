import SignHeader from '../components/SignHeader/SignHeader';
import SignMain from '../components/SignMain/SignMain';
import { GLOBALSTATE, store } from '../store';
import { login, signup } from '../utils/api/auth';
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
    this.addEventHandler();
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

  setState = (type: string, changeState: any) => {
    const nextState = { ...this.state };
    nextState[type] = changeState;
    this.state = nextState;
    this.render();
  };

  addEventHandler = () => {
    if (!this.isSignup) {
      this.addLoginHandler();
    } else {
      this.addSignupHandler();
    }
  };

  addLoginHandler = () => {
    this.$target.addEventListener('submit', (e) =>
      this.loginSubmitHelper(e, this.loginSubmitHandler),
    );
  };

  loginSubmitHelper = (e, cb) => {
    e.preventDefault();
    const $error: HTMLElement = this.$target.querySelector('.js-error');
    const [email, password] = [...e.target.querySelectorAll('input')].map(
      ($input: HTMLInputElement) => $input.value,
    );

    cb({ email, password, $error });
  };

  loginSubmitHandler = async ({ email, password, $error }) => {
    try {
      const {
        data: { message },
      } = await login({ email, password });
      console.log(message);

      localStorage.setItem('user', 'true');
      location.href = '/';
    } catch (e) {
      const {
        response: {
          data: { message },
        },
      } = e;
      if (message) $error.textContent = message;
      else console.error(e);
    }
  };

  addSignupHandler = () => {
    this.$target.addEventListener('submit', (e) =>
      this.signupSubmitHelper(e, this.signupSubmitHandler),
    );
  };

  signupSubmitHelper = (e, cb) => {
    e.preventDefault();
    const $error: HTMLElement = this.$target.querySelector('.js-error');
    const [email, nickname, password, passwordConfirm] = [
      ...e.target.querySelectorAll('input'),
    ].map(($input: HTMLInputElement) => $input.value);

    if (password !== passwordConfirm) {
      $error.textContent = '비밀번호를 확인해주세요';
    } else {
      cb({ email, nickname, password, $error });
    }
  };

  signupSubmitHandler = async ({ email, password, nickname, $error }) => {
    try {
      const {
        data: { message },
      } = await signup({ email, password, nickname });
      console.log(message);

      location.href = '/';
    } catch (e) {
      const {
        response: {
          data: { message },
        },
      } = e;
      if (message) $error.textContent = message;
      else console.error(e);
    }
  };
}
export default SignContainer;
