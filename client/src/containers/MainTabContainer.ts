import MainTab from '../components/MainTab/MainTab';
import { GLOBALSTATE, store } from '../store';
import { setAccount } from '../utils/api/account';
import { getPayment, removePayment, setPayment } from '../utils/api/payment';
import View from '../utils/View';

const IDENTIFIER = 'maintab';

const STATE = {
  slide: 'slide',
  isIncome: 'isIncome',
  category: 'category',
  content: 'content',
  payment: 'payment',
  amount: 'amount',
  isActive: 'isActive',
  modal: 'modal',
};

class MainTabContainer extends View {
  state: any;
  MainTab: Function;
  constructor({ $target }) {
    super({ $target });
    this.MainTab = MainTab;
    this.$target = $target;
    this.state = {
      date: undefined,
      user: undefined,
      slide: undefined,
      classificationList: [
        { name: '지출', is_income: 0 },
        { name: '수입', is_income: 1 },
      ],
      isIncome: 0,
      categoryList: [],
      category: {},
      content: '',
      paymentList: [],
      payment: {},
      amount: '',
      modal: false,
      isActive: false,
    };
    this.render();
    this.componentDidMount();
    this.onEventHandler();
  }

  render = () => {
    console.log(this.state);
    this.$target.innerHTML = this.MainTab(this.state);
  };

  componentDidMount = () => {
    store.subscribe(GLOBALSTATE.date, IDENTIFIER, this.setState);
    store.subscribe(GLOBALSTATE.user, IDENTIFIER, this.setState);
    store.subscribe(GLOBALSTATE.categoryList, IDENTIFIER, this.setState);
    store.subscribe(GLOBALSTATE.paymentList, IDENTIFIER, this.setState);
  };

  setState = (type: string, changeState: any) => {
    const nextState = { ...this.state };
    nextState[type] = changeState;
    this.state = nextState;
    this.render();
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
        if (this.state.slide === 0) this.setState(STATE.slide, null);
        else this.setState(STATE.slide, 0);
      } else if (target.closest('.js-btn-category')) {
        if (this.state.slide === 1) this.setState(STATE.slide, null);
        else this.setState(STATE.slide, 1);
      } else if (target.closest('.js-btn-payment')) {
        if (this.state.slide === 2) this.setState(STATE.slide, null);
        else this.setState(STATE.slide, 2);
      }
    } else if (target.closest('.drop-down')) {
      if (target.closest('.js-modal-payment')) {
        this.setState(STATE.modal, true);
      } else if (target.closest('.js-remove-payment')) {
        this.removePaymentHandler(e);
      } else if (target.closest('.drop-down-classification')) {
        this.setState(STATE.isIncome, +target.dataset.index);
        this.setState(STATE.category, {});
        this.setState(STATE.slide, null);
      } else if (target.closest('.drop-down-category')) {
        this.setState(STATE.category, target.dataset);
        this.setState(STATE.slide, null);
      } else if (target.closest('.drop-down-payment')) {
        this.setState(STATE.payment, target.dataset);
        this.setState(STATE.slide, null);
      }
    } else if (target.closest('.modal')) {
      if (target.closest('.js-modal-cancel')) {
        this.setState(STATE.modal, false);
      } else if (target.closest('.js-add-payment')) {
        this.addPaymentHandler();
      }
    }
    this.onActiveHandler();
  };

  onInputHandler = (e) => {
    const target = e.target as HTMLInputElement;
    if (target.classList.contains('input-content')) {
      this.setState(STATE.content, target.value);
    } else if (target.classList.contains('input-amount')) {
      target.value = this.priceValidation(target.value);
      this.setState(STATE.amount, target.value);
    }
    const cls = target.classList[1];
    const cb = (cls) => {
      const $input: HTMLInputElement = this.$target.querySelector(`.${cls}`);
      $input.focus();
      $input.selectionStart = $input.value.length;
    };
    this.onActiveHandler(() => cb(cls));
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
    const split = date.split('-').map((v) => +v);
    const content = this.state.content;
    const amount = this.state.amount.replace(/[^0-9]/g, '');
    const timestamp = new Date(split[0], split[1], split[2]);
    const category_id = this.state.category.id;
    const payment_id = this.state.payment && this.state.payment.id;
    try {
      const {
        data: { message },
      } = await setAccount({
        content,
        amount,
        timestamp,
        category_id,
        payment_id,
      });
      console.log(message);
    } catch (e) {
      const {
        response: {
          data: { message },
        },
      } = e;
      if (message) throw new Error(message);
      console.error(e);
    }
  };

  addPaymentHandler = async () => {
    const { value: name }: HTMLInputElement =
      this.$target.querySelector('.modal-input');
    if (name) {
      try {
        const {
          data: { message },
        } = await setPayment({ name });
        console.log(message);

        const {
          data: { data },
        } = await getPayment();
        store.setState(GLOBALSTATE.paymentList, data);
        this.setState(STATE.modal, false);
      } catch (e) {
        const {
          response: {
            data: { message },
          },
        } = e;
        if (message) throw new Error(message);
        console.error(e);
      }
    }
  };

  removePaymentHandler = async (e) => {
    const target = e.target as HTMLElement;
    const id = target.parentElement.dataset.id;
    try {
      const {
        data: { message },
      } = await removePayment({ id });
      console.log(message);

      const {
        data: { data },
      } = await getPayment();
      store.setState(GLOBALSTATE.paymentList, data);
    } catch (e) {
      const {
        response: {
          data: { message },
        },
      } = e;
      if (message) throw new Error(message);
      console.error(e);
    }
  };

  onActiveHandler = (cb?) => {
    if (this.state.isIncome === 0) {
      if (
        this.state.date &&
        Object.keys(this.state.category).length &&
        this.state.content &&
        this.state.amount
      ) {
        if (!this.state.isActive) this.setState(STATE.isActive, true);
      } else {
        if (this.state.isActive) this.setState(STATE.isActive, false);
      }
    } else {
      if (
        this.state.date &&
        Object.keys(this.state.category).length &&
        this.state.content &&
        Object.keys(this.state.payment).length &&
        this.state.amount
      ) {
        if (!this.state.isActive) this.setState(STATE.isActive, true);
      } else {
        if (this.state.isActive) this.setState(STATE.isActive, false);
      }
    }
    if (cb) cb();
  };
}
export default MainTabContainer;
