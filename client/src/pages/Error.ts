import View from '../utils/View';

class Error extends View {
  constructor({ $target }) {
    super({ $target });
    this.$target = $target;
    this.render();
  }
  render() {
    this.$target.innerHTML = `404`;
  }
}
export default Error;
