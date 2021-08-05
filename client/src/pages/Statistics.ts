import MainChartContainer from '../containers/MainChartContainer';
import HeaderContainer from '../containers/HeaderContainer';
import LineChart from '../components/LineChart/LineChart';

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
    $donut.className = 'main-chart';
    const mainChartContainer = new MainChartContainer({ $target: $donut });
    $fragment.append(headerContainer.html, mainChartContainer.html);

    const $dummy = document.createElement('div');
    $dummy.innerHTML = LineChart({ accountByCategory: [] });
    $fragment.append($dummy.firstElementChild);
    this.$app.innerHTML = '';
    this.$app.appendChild($fragment);
  };
}
export default Statistics;
