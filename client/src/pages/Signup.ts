import SignContainer from '../containers/SignContainer';

class Signup {
  $app: HTMLElement;
  constructor({ $app }) {
    this.$app = $app;
    this.render();
  }
  render = () => {
    const $fragment = document.createDocumentFragment();
    const $div = document.createElement('div');
    const signContainer = new SignContainer({ $target: $div, isSignup: true });
    $fragment.append(signContainer.html);
    this.$app.innerHTML = '';
    this.$app.appendChild($fragment);
  };
}
export default Signup;
