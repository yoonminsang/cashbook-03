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

    for (let i = 0; i < newElements.length; i++) {
      const newEl = newElements[i];
      const curEl = currentElements[i];

      if (newEl.childElementCount !== curEl.childElementCount) {
        this.$target.innerHTML = newMarkup;
        return;
      }

      if (!newEl.isEqualNode(curEl)) {
        if (newEl.tagName !== curEl.tagName) {
          curEl.replaceWith(newEl);
        } else {
          if (
            curEl.firstChild?.nodeName === '#text' &&
            curEl.firstChild.nodeValue !== newEl.firstChild.nodeValue
          ) {
            curEl.firstChild.nodeValue = newEl.firstChild.nodeValue;
          }

          const curAttributes = curEl.attributes;
          const newAttributes = newEl.attributes;

          Array.from(curAttributes).forEach((attr) => {
            if (!newAttributes.getNamedItem(attr.name))
              curEl.removeAttribute(attr.name);
          });

          Array.from(newAttributes).forEach((attr) => {
            const currentAttribute = curAttributes.getNamedItem(attr.name);
            if (!currentAttribute || currentAttribute.value !== attr.value)
              curEl.setAttribute(attr.name, attr.value);
          });
        }
      }
    }

    newElements.forEach((newEl, i) => {});
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
