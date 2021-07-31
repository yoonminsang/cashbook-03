import MainTab from '../components/MainTab/MainTab';
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
    const headerContainer = new HeaderContainer({ $target: $header });
    const $mainTab = document.createElement('div');
    $mainTab.innerHTML = MainTab({});
    $fragment.append(headerContainer.html, $mainTab.firstElementChild);
    this.$app.innerHTML = '';
    this.$app.appendChild($fragment);
  };
}
export default Main;
