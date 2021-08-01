import MainTab from '../components/MainTab/MainTab';
import { GLOBALSTATE, store } from '../store';
import View from '../utils/View';

const IDENTIFIER = 'maintab';

const STATE = {
  slide: 'slide',
  isIncome: 'isIncome',
  category: 'category',
  content: 'content',
  payment: 'payment',
  price: 'price',
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
      price: '',
      modal: false,
    };
    this.render();
    this.componentDidMount();
    this.addEventHandler();
  }

  render = () => {
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

  addEventHandler = () => {
    this.$target.addEventListener('click', this.addClickHandler);
    this.$target.addEventListener('change', this.addChangeHandler);
    this.$target.addEventListener('input', this.addInputHandler);
    this.$target.addEventListener('submit', this.addSubmitHandler);
  };

  addClickHandler = (e) => {
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
      if (target.closest('.js-add-payment')) {
        this.setState(STATE.modal, true);
      }
      if (target.closest('.drop-down-classification')) {
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
    } else if (target.closest('.js-add-payment')) {
      this.setState(STATE.modal, true);
    } else if (target.closest('.js-cancel')) {
      this.setState(STATE.modal, false);
    } else if (target.closest('.js-add')) {
      this.addPaymentHandler();
    }
  };

  addChangeHandler = (e) => {
    const target = e.target as HTMLInputElement;
    if (target.classList.contains('input-content')) {
      this.setState(STATE.content, target.value);
    } else if (target.classList.contains('input-price')) {
      this.setState(STATE.price, target.value);
    }
  };

  addInputHandler = (e) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    if (target.classList.contains('input-price')) {
      if (value)
        target.value = parseInt(value.replace(/[^0-9]/g, '')).toLocaleString(
          'ko-KR',
        );
    }
  };

  addSubmitHandler = (e) => {
    e.preventDefault();
  };

  addPaymentHandler = () => {};

  //   addActiveHandler = () => {
  //     const btn = this.$target.querySelector('.save-button-large');
  //     const { value: content } = this.$target.querySelector(
  //       '.input-content',
  //     ) as HTMLInputElement;
  //     const { value: price } = this.$target.querySelector(
  //       '.input-price',
  //     ) as HTMLInputElement;
  //     if (this.state.isIncome === 0) {
  //       if (
  //         this.state.date &&
  //         Object.keys(this.state.category).length &&
  //         content &&
  //         price
  //       )
  //         btn.classList.add('active');
  //       else btn.classList.remove('active');
  //     } else {
  //       if (
  //         this.state.date &&
  //         Object.keys(this.state.category).length &&
  //         content &&
  //         Object.keys(this.state.payment).length &&
  //         price
  //       )
  //         btn.classList.add('active');
  //       else btn.classList.remove('active');
  //     }
  //   };
}
export default MainTabContainer;
