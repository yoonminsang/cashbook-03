import Calendar from './pages/Calendar';
import Error from './pages/Error';
import Main from './pages/Main';
import Statistics from './pages/Statistics';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Router from './Router';
import { GLOBALSTATE, store } from './store';
import './public/styles/index.scss';
import { check } from './utils/api/auth';

const checkUser = async () => {
  try {
    const {
      data: { user },
    } = await check();
    store.setState(GLOBALSTATE.user, user);
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

const init = async () => {
  const today = new Date();
  store.setState(GLOBALSTATE.date, {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  });
  if (localStorage.getItem('user')) {
    checkUser();
  } else {
    store.setState(GLOBALSTATE.user, null);
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
