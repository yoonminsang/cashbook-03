import SignHeader from '../components/SignHeader/SignHeader';
import SignContainer from '../containers/SignContainer';

class Login {
  $app: HTMLElement;
  constructor({ $app }) {
    this.$app = $app;
    this.render();
  }
  render = () => {
    const $header = document.createElement('header');
    $header.innerHTML = SignHeader();

    const $main = document.createElement('main');
    new SignContainer({ $target: $main, isSignup: false });

    const fragment = document.createDocumentFragment();
    fragment.appendChild($header);
    fragment.appendChild($main);

    this.$app.innerHTML = '';
    this.$app.appendChild(fragment);
  };
}
export default Login;
