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
import { getCategory } from './utils/api/category';

const setDate = () => {
  const today = new Date();
  store.setState(GLOBALSTATE.date, {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  });
};

const checkUserHandler = async () => {
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

const setCategoryHandler = async () => {
  try {
    const {
      data: { data },
    } = await getCategory();
    store.setState(GLOBALSTATE.categoryList, data);
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
  setDate();
  if (localStorage.getItem('user')) {
    checkUserHandler();
  } else {
    store.setState(GLOBALSTATE.user, null);
  }
  setCategoryHandler();
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
