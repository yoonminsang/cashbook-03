import DonutContainer from '../containers/DonutContainer';
import HeaderContainer from '../containers/HeaderContainer';

class Statistics {
  $app: HTMLElement;
  constructor({ $app }) {
    this.$app = $app;
    this.render();
  }
  render = () => {
    const $fragment = document.createDocumentFragment();
    const $header = document.createElement('header');
    const headerContainer = new HeaderContainer({ $target: $header });
    const $donut = document.createElement('article');
    $donut.className = 'donut';
    const donutContainer = new DonutContainer({ $target: $donut });
    $fragment.append(headerContainer.html, donutContainer.html);
    this.$app.innerHTML = '';
    this.$app.appendChild($fragment);
  };
}
export default Statistics;
