import Account from '../components/Account/Account';
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
    const $account = document.createElement('main');
    $account.className = 'account';
    $account.innerHTML = Account({});
    $fragment.append(headerContainer.html, mainTabContainer.html, $account);
    this.$app.innerHTML = '';
    this.$app.appendChild($fragment);
  };
}
export default Main;
