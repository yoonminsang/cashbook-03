class View {
  $target: HTMLElement;
  state: object;
  constructor({ $target }) {
    this.$target = $target;
  }
  get html() {
    return this.$target;
  }
  render() {
    this.$target.innerHTML = this.markup();
  }

  update() {
    const newMarkup = this.markup();

    const newDom = document.createRange().createContextualFragment(newMarkup);

    const newElements = Array.from(newDom.querySelectorAll('*'));
    const currentElements = Array.from(this.$target.querySelectorAll('*'));

    if (newElements.length !== currentElements.length) {
      this.$target.innerHTML = newMarkup;
      return;
    }

    newElements.forEach((newEl, i) => {
      const curEl = currentElements[i];

      if (!newEl.isEqualNode(curEl)) {
        if (newEl.tagName !== curEl.tagName) {
          curEl.replaceWith(newEl);
        }
      }

      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue?.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  markup() {
    return '';
  }

  setState(nextState) {
    this.state = nextState;
    this.update();
  }

  getGlobalState() {}
}
export default View;
