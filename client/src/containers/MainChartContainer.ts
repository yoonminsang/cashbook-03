import LineChart from '../components/LineChart/LineChart';
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
    accountStore.subscribe(this.clearLineChart);
  };

  addEventHandler = () => {
    this.$target.addEventListener('click', this.getCategoryAccount);
  };

  getCategoryAccount = async (e: Event) => {
    const $target = e.target as HTMLElement;
    if (!$target.closest('.js-category')) return;
    const $category = $target.closest('.js-category') as HTMLElement;

    const { year, month } = dateStore.state;
    const categoryId = $category.dataset.id;

    const accounts = await getAccountByCategory({ year, month, categoryId });
    if (!accounts.length) return;

    this.showLineChart({ accounts, month });
  };

  showLineChart = ({ accounts, month }) => {
    this.clearLineChart();
    this.$target.insertAdjacentHTML(
      'afterend',
      LineChart({
        accountByCategory: accounts,
        currentMonth: month,
      }),
    );

    document
      .querySelector('.line-chart')
      .scrollIntoView({ behavior: 'smooth' });
  };

  clearLineChart = () => {
    document.querySelector('.line-chart')?.remove();
  };
}
export default MainChartContainer;
