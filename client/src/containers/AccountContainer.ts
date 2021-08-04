import Account from '../components/Account/Account';
import View from '../utils/View';
import accountStore from '../store/account';

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
      modal: false,
      data: undefined,
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
    const removeModal: HTMLElement = target.closest('.js-remove-modal');
    if (target.closest('.btn-income')) {
      if (!this.state.expenditure) return;
      this.setState({ ...this.state, income: !this.state.income });
    } else if (target.closest('.btn-expenditure')) {
      if (!this.state.income) return;
      this.setState({ ...this.state, expenditure: !this.state.expenditure });
    } else if (removeModal) {
      const {
        dataset: { id, content },
      } = removeModal;
      // await accountStore.remove({ account_id });
      this.setState({ ...this.state, modal: true });
      this.setState({ ...this.state, data: { id, content } });
    } else if (target.closest('.js-remove-account')) {
      const {
        dataset: { id: account_id },
      } = target;
      await accountStore.remove({ account_id });
      this.setState({ ...this.state, modal: false });
    } else if (target.closest('.js-modal-cancel')) {
      this.setState({ ...this.state, modal: false });
    } else {
      // this.setState({ ...this.state, modal: false });
    }
  };
}
export default AccountContainer;
