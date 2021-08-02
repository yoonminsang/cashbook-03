import Calendar from './pages/Calendar';
import Error from './pages/Error';
import Main from './pages/Main';
import Statistics from './pages/Statistics';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Router from './Router';
import './public/styles/index.scss';
import { check } from './utils/api/auth';
import User from './store/user';
import CurrentDate from './store/date';

const initUser = async () => {
  try {
    const {
      data: { user },
    } = await check();
    User.setState(user);
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

const initDate = async () => {
  const today = new Date();

  // test용 setTimeout
  setTimeout(() => {
    CurrentDate.setState({
      year: today.getFullYear(),
      month: today.getMonth() + 1,
    });
  }, 1000);
};

const init = async () => {
  await Promise.all([initDate(), initUser()]);
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
