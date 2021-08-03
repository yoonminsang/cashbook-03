import Calendar from './pages/Calendar';
import Error from './pages/Error';
import Main from './pages/Main';
import Statistics from './pages/Statistics';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Router from './Router';
import './public/styles/index.scss';

import userStore from './store/user';
import dateStore from './store/date';
import paymentStore from './store/payment';
import categoryStore from './store/category';
import accountStore from './store/account';

const init = async () => {
  dateStore.init();

  if (localStorage.getItem('user')) {
    await userStore.init();
    if (userStore.state) {
      accountStore.get({ ...dateStore.state });
      paymentStore.init();
      categoryStore.init();
      // dateStore.subscribe(() =>
      //   accountStore.get({
      //     ...dateStore.state,
      //   }),
      // );
    }
  } else {
    userStore.setState(null);
  }
};

init();

const $app = document.querySelector('#app');
const routes = {
  '/': Main,
  '/calendar': Calendar,
  '/statistics': Statistics,
  '/login': Login,
  '/signup': Signup,
};
const $div = document.createElement('div');
const error = new Error({ $target: $div });
new Router({
  $app,
  routes,
  error,
});
