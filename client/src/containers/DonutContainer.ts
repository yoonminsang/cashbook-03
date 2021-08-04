import Donut from '../components/Donut/Donut';
import accountStore from '../store/account';
import View from '../utils/View';

class DonutContainer extends View {
  state: any;
  Donut: Function;
  constructor({ $target }) {
    super({ $target });
    this.state = { account: accountStore.state };

    this.Donut = Donut;
    this.render();

    this.componentDidMount();
    this.addEventHandler();
  }

  markup = () => {
    return this.Donut(this.state);
  };

  getGlobalState = () => {
    const nextState = { ...this.state };
    nextState.account = accountStore.state;

    this.setState(nextState);
  };

  componentDidMount = () => {
    accountStore.subscribe(this.getGlobalState);
  };

  addEventHandler = () => {};
}
export default DonutContainer;
