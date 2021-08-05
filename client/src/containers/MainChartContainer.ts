import { MainChart, showDonut } from '../components/MainChart/MainChart';
import accountStore from '../store/account';
import dateStore from '../store/date';
import { getAccountByCategory } from '../utils/api/account';
import View from '../utils/View';

class MainChartContainer extends View {
  state: any;
  MainChart: Function;
  constructor({ $target }) {
    super({ $target });
    this.$target = $target;
    this.state = { account: accountStore.state };

    this.MainChart = MainChart;
    this.render();

    this.componentDidMount();
    this.addEventHandler();
  }

  markup = () => {
    return this.MainChart(this.state);
  };

  showAnimation = () => {
    showDonut();
  };

  getGlobalState = () => {
    const nextState = { ...this.state };
    nextState.account = accountStore.state;

    this.setState(nextState);
  };

  componentDidMount = () => {
    // setTimeout(() => this.showAnimation(), 500);
    accountStore.subscribe(this.getGlobalState);
    accountStore.subscribe(this.showAnimation);
    accountStore.get({
      ...dateStore.state,
    });
    accountStore.state = { data: accountStore.state };
  };

  addEventHandler = () => {
    this.$target.addEventListener('click', this.getCategoryAccount);
  };

  getCategoryAccount = async (e: Event) => {
    const $target = e.target as HTMLElement;
    if (!$target.closest('.js-category')) return;

    const { year, month } = dateStore.state;
    const categoryId = $target.dataset.id.toString();

    const accounts = await getAccountByCategory({ year, month, categoryId });
    if (!accounts.length) return;

    this.showLineChart();
  };

  showLineChart = () => {};
}
export default MainChartContainer;
