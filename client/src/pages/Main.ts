import MainTab from '../components/MainTab/MainTab';
import HeaderContainer from '../containers/HeaderContainer';
import MainTabContainer from '../containers/MainTabContainer';

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
    $mainTab.className = 'main-tab';
    const mainTabContainer = new MainTabContainer({ $target: $mainTab });
    $fragment.append(headerContainer.html, mainTabContainer.html);
    this.$app.innerHTML = '';
    this.$app.appendChild($fragment);
  };
}
export default Main;
