import Calendar from './pages/Calendar';
import Error from './pages/Error';
import Main from './pages/Main';
import Statistics from './pages/Statistics';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Router from './Router';
import { GLOBALSTATE, store } from './store';
import './public/styles/index.scss';

// 날짜, 자동로그인, db 데이터 store로 setState

// dummy data
const today = new Date();
store.setState(GLOBALSTATE.date, {
  year: today.getFullYear(),
  month: today.getMonth() + 1,
});
// store.setState(GLOBALSTATE.user, { id: 1, nickname: '민상', email: 'woowa@' });
store.setState(GLOBALSTATE.user, null);

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
