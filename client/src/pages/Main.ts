import HeaderContainer from '../containers/HeaderContainer';

class Main {
  $app: HTMLElement;
  constructor({ $app }) {
    this.$app = $app;
    this.render();
  }
  render = () => {
    const $fragment = document.createDocumentFragment();
    const $header = document.createElement('header');
    $header.className = 'header';
    const headerContainer = new HeaderContainer({ $target: $header });
    $fragment.append(headerContainer.html);
    this.$app.innerHTML = '';
    this.$app.appendChild($fragment);
  };
}
export default Main;
