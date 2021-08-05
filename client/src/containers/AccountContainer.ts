import Account from '../components/Account/Account';
import View from '../utils/View';
import accountStore from '../store/account';
import MainTabContainer from './MainTabContainer';
import { getAccountById } from '../utils/api/account';

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
    } else if (target.closest('.js-modify')) {
      this.modify(target.dataset.id);
    } else {
      if (this.$target.querySelector('.modal.modify')) {
        if (!target.closest('.main-tab-inner')) {
          this.$target.removeChild(this.$target.querySelector('.modal.modify'));
        }
      }
    }
  };

  async modify(id) {
    const state = await getAccountById({ id });
    state.category = { id: state.category_id, name: state.category_name };
    state.payment = { id: state.payment_id, name: state.payment_name };
    const $target = document.createElement('div');
    $target.className = 'modal modify';
    const mainTabContainer = new MainTabContainer({ $target, state });
    this.$target.append(mainTabContainer.html);
  }
}
export default AccountContainer;
