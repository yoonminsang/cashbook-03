import Calendar from './pages/Calendar';
import Error from './pages/Error';
import Main from './pages/Main';
import Statistics from './pages/Statistics';
import Router from './Router';
import { GLOBALSTATE, store } from './store';

// 날짜, 자동로그인, db 데이터 store로 setState

// dummy data
const today = new Date();
store.setState(GLOBALSTATE.date, {
  year: today.getFullYear(),
  month: today.getMonth() + 1,
});
store.setState(GLOBALSTATE.user, { id: 1, nickname: '민상', email: 'woowa@' });

const $app = document.querySelector('#app');
const routes = {
  '/': Main,
  '/calendar': Calendar,
  '/statistics': Statistics,
};
const error = new Error();
new Router({
  $app,
  routes,
  error,
});
