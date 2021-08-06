import SignMain from '../components/SignMain/SignMain';
import userStore from '../store/user';
import { login, signup } from '../utils/api/auth';
import View from '../utils/View';

class SignContainer extends View {
  Main: Function;
  isSignup: boolean;
  state: any;
  constructor({ $target, isSignup }) {
    super({ $target });
    this.Main = SignMain;
    this.isSignup = isSignup;
    this.state = { user: userStore.state };
    this.$target = $target;
    this.render();
    this.componentDidMount();
    this.addEventHandler();
  }

  markup = () => {
    return this.Main(this.isSignup);
  };

  componentDidMount = () => {
    userStore.subscribe(this.getGlobalState);
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
    this.$target.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('.js-github')) {
        location.href = `http://${location.hostname}:3000/api/auth/github`;
        localStorage.setItem('user', 'true');
      }
    });
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
      await login({ email, password });

      localStorage.setItem('user', 'true');
      location.href = '/';
    } catch (message) {
      $error.textContent = message;
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
      await signup({ email, password, nickname });
      location.href = '/';
    } catch (message) {
      $error.textContent = message;
    }
  };
}
export default SignContainer;
