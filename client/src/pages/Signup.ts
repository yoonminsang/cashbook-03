class Signup {
  $app: HTMLElement;
  constructor({ $app }) {
    this.$app = $app;
    this.render();
  }
  render = () => {
    const $fragment = document.createDocumentFragment();
    const $div = document.createElement('div');
    this.$app.innerHTML = '';
    this.$app.appendChild($fragment);
  };
}
export default Signup;
