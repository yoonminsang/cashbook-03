import MainTab from '../components/MainTab/MainTab';
import userStore from '../store/user';
import dateStore from '../store/date';
import paymentStore from '../store/payment';
import categoryStore from '../store/category';
import View from '../utils/View';
import account from '../store/account';

class MainTabContainer extends View {
  initialState: any;
  state: any;
  MainTab: Function;
  modify: boolean;
  constructor({ $target, state }) {
    super({ $target });
    if (state) this.modify = true;
    else this.modify = false;
    this.MainTab = MainTab;
    this.$target = $target;
    this.initialState = {
      slide: undefined,
      classificationList: [
        { name: '지출', is_income: 0 },
        { name: '수입', is_income: 1 },
      ],
      isIncome: 0,
      category: {},
      content: '',
      payment: {},
      amount: '',
      modal: false,
      isActive: false,
      accountId: null,
    };
    this.state = {
      ...this.initialState,
      date: dateStore.state,
      user: userStore.state,
      paymentList: paymentStore.state,
      categoryList: categoryStore.state,
      ...state,
    };
    this.render();
    this.componentDidMount();
    this.onEventHandler();
  }

  markup = () => this.MainTab(this.state);

  getGlobalState = () => {
    const nextState = { ...this.state };
    nextState.date = dateStore.state;
    nextState.user = userStore.state;
    nextState.paymentList = paymentStore.state;
    nextState.categoryList = categoryStore.state;

    this.setState(nextState);
  };

  componentDidMount = () => {
    [dateStore, userStore, paymentStore, categoryStore].forEach((store) =>
      store.subscribe(this.getGlobalState),
    );
    this.onActiveHandler();
  };

  onEventHandler = () => {
    this.$target.addEventListener('click', this.onClickHandler);
    this.$target.addEventListener('input', this.onInputHandler);
    this.$target.addEventListener('submit', this.onSubmitHandler);
  };

  onClickHandler = (e) => {
    const target = e.target as HTMLElement;
    if (!this.state.user) {
      alert('로그인 해주세요');
      location.href = '/login';
    } else if (target.closest('.js-btn-slide')) {
      if (target.closest('.js-btn-classification')) {
        if (this.state.slide === 0)
          this.setState({ ...this.state, slide: null });
        else this.setState({ ...this.state, slide: 0 });
      } else if (target.closest('.js-btn-category')) {
        if (this.state.slide === 1)
          this.setState({ ...this.state, slide: null });
        else this.setState({ ...this.state, slide: 1 });
      } else if (target.closest('.js-btn-payment')) {
        if (this.state.slide === 2)
          this.setState({ ...this.state, slide: null });
        else this.setState({ ...this.state, slide: 2 });
      }
    } else if (target.closest('.drop-down')) {
      if (target.closest('.js-modal-payment')) {
        this.setState({ ...this.state, modal: true });
      } else if (target.closest('.js-remove-payment')) {
        this.removePaymentHandler(e);
      } else if (target.closest('.drop-down-classification')) {
        this.setState({ ...this.state, isIncome: +target.dataset.index });
        this.setState({ ...this.state, category: {} });
        this.setState({ ...this.state, slide: null });
      } else if (target.closest('.drop-down-category')) {
        this.setState({ ...this.state, category: target.dataset });
        this.setState({ ...this.state, slide: null });
      } else if (target.closest('.drop-down-payment')) {
        this.setState({ ...this.state, payment: target.dataset });
        this.setState({ ...this.state, slide: null });
      }
    } else if (target.closest('.modal')) {
      if (target.closest('.js-modal-cancel')) {
        this.setState({ ...this.state, modal: false });
      } else if (target.closest('.js-add-payment')) {
        this.addPaymentHandler();
      }
    } else {
      this.setState({ ...this.state, slide: null });
    }
    this.onActiveHandler();
  };

  onInputHandler = (e) => {
    const target = e.target as HTMLInputElement;
    if (target.classList.contains('input-content')) {
      this.setState({ ...this.state, content: target.value });
    } else if (target.classList.contains('input-amount')) {
      target.value = this.priceValidation(target.value);
      this.setState({ ...this.state, amount: target.value });
    }
    this.onActiveHandler();
  };

  priceValidation = (value) => {
    if (typeof value === 'number') value = value + '';
    value = value.replace(/[^0-9]/g, '');
    if (value.length > 0) value = parseInt(value).toLocaleString('ko-KR');
    return value;
  };

  onSubmitHandler = async (e) => {
    e.preventDefault();
    const { value: date } = this.$target.querySelector(
      'input[type="date"]',
    ) as HTMLInputElement;
    if (!this.state.isActive) return;
    const id = this.state.id;
    const split = date.split('-').map((v) => +v);
    const content = this.state.content;
    const amount = this.state.amount.replace(/[^0-9]/g, '');
    const timestamp = new Date(split[0], split[1] - 1, split[2]).toISOString();
    const category_id = this.state.category.id;
    const payment_id = this.state.payment && this.state.payment.id;

    if (this.modify) {
      await account.modify({
        id,
        content,
        amount,
        timestamp,
        category_id,
        payment_id,
      });
      this.$target.remove();
    } else {
      await account.add({
        content,
        amount,
        timestamp,
        category_id,
        payment_id,
      });
      this.setState({
        ...this.state,
        ...this.initialState,
      });
      const inputDate: HTMLInputElement =
        this.$target.querySelector('input[type="date"]');
      const inputContent: HTMLInputElement =
        this.$target.querySelector('.input-content');
      const inputAmount: HTMLInputElement =
        this.$target.querySelector('.input-amount');

      const year = this.state.date && this.state.date.year;
      const month =
        this.state.date &&
        (this.state.date.month < 10
          ? '0' + this.state.date.month
          : this.state.date.month);
      const tempDatee = new Date().getDate();
      const datee = tempDatee < 10 ? '0' + tempDatee : tempDatee;

      inputDate.value = `${year}-${month}-${datee}`;
      inputContent.value = '';
      inputAmount.value = '';
    }
  };

  addPaymentHandler = async () => {
    const { value: name }: HTMLInputElement =
      this.$target.querySelector('.modal-input');
    if (name) {
      await paymentStore.add({ name });
      this.setState({ ...this.state, modal: false });
      this.setState({ ...this.state, slide: null });
    }
  };

  removePaymentHandler = async (e) => {
    const target = e.target as HTMLElement;
    const id = target.parentElement.dataset.id;

    paymentStore.remove({ id });
  };

  onActiveHandler = () => {
    if (this.state.isIncome !== 0) {
      if (
        this.state.date &&
        Object.keys(this.state.category).length &&
        this.state.content &&
        this.state.amount
      ) {
        this.setState({ ...this.state, isActive: true });
      } else {
        this.setState({ ...this.state, isActive: false });
      }
    } else {
      if (
        this.state.date &&
        Object.keys(this.state.category).length &&
        this.state.content &&
        Object.keys(this.state.payment).length &&
        this.state.amount
      ) {
        this.setState({ ...this.state, isActive: true });
      } else {
        this.setState({ ...this.state, isActive: false });
      }
    }
  };
}
export default MainTabContainer;
