import { MainChart, showDonut } from '../components/MainChart/MainChart';
import accountStore from '../store/account';
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
    accountStore.subscribe(this.getGlobalState);
    accountStore.subscribe(this.showAnimation);
  };

  addEventHandler = () => {};
}
export default MainChartContainer;
