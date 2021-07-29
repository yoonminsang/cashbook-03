import HeaderContainer from '../containers/HeaderContainer';

class Calendar {
  $app: HTMLElement;
  constructor({ $app }) {
    this.$app = $app;
    this.render();
  }
  render = () => {
    const $fragment = document.createDocumentFragment();
    const $header = document.createElement('header');
    const headerContainer = new HeaderContainer({ $target: $header });
    $fragment.append(headerContainer.html);
    this.$app.innerHTML = '';
    this.$app.appendChild($fragment);
  };
}
export default Calendar;
