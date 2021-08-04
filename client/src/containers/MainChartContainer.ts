import { MainChart, showDonut } from '../components/MainChart/MainChart';
import accountStore from '../store/account';
import dateStore from '../store/date';
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
    console.log('mainchar container getglobal');
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
  };

  addEventHandler = () => {};
}
export default MainChartContainer;
