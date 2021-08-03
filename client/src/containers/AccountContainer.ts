import Account from '../components/Account/Account';
import View from '../utils/View';
import accountStore from '../store/account';
import { removeAccount } from '../utils/api/account';

class AccountContainer extends View {
  initialState: any;
  state: any;
  Account: Function;
  constructor({ $target }) {
    super({ $target });
    this.Account = Account;
    this.$target = $target;
    this.state = {
      accountList: accountStore.state,
      income: true,
      expenditure: true,
    };
    this.render();
    this.componentDidMount();
    this.onEventHandler();
  }

  markup = () => this.Account(this.state);

  getGlobalState = () => {
    const nextState = { ...this.state };
    nextState.accountList = accountStore.state;
    this.setState(nextState);
  };

  componentDidMount = () => {
    [accountStore].forEach((store) => store.subscribe(this.getGlobalState));
  };

  onEventHandler = () => {
    this.$target.addEventListener('click', this.onClickHandler);
  };

  onClickHandler = async (e) => {
    const target = e.target as HTMLElement;
    const removeClosest: HTMLElement = target.closest('.js-remove-account');
    if (target.closest('.btn-income')) {
      if (!this.state.expenditure) return;
      this.setState({ ...this.state, income: !this.state.income });
    } else if (target.closest('.btn-expenditure')) {
      if (!this.state.income) return;
      this.setState({ ...this.state, expenditure: !this.state.expenditure });
    }
    if (removeClosest) {
      const {
        dataset: { accountId: account_id },
      } = removeClosest;
      await accountStore.remove({ account_id });
    }
  };
}
export default AccountContainer;
