class View {
  $target: HTMLElement;
  constructor({ $target }) {
    this.$target = $target;
  }
  get html() {
    return this.$target;
  }
}
export default View;
