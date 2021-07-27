import Calendar from './pages/Calendar';
import Error from './pages/Error';
import Main from './pages/Main';
import Statistics from './pages/Statistics';
import Router from './Router';
import { store } from './store';

const GLOBALSTATE = {
  date: 'date',
  user: 'user',
  data: 'data',
};

// 날짜, 자동로그인, db 데이터 store로 setState

// dummy data
const today = new Date();
store.setState(GLOBALSTATE.date, {
  year: today.getFullYear(),
  month: today.getMonth(),
});
store.setState(GLOBALSTATE.user, { id: 1, nickname: '민상', email: 'woowa@' });

const $app = document.querySelector('#root');
const routes = {
  '/': Main,
  '/calendar': Calendar,
  '/Statistics': Statistics,
};
const error = new Error();
new Router({
  $app,
  routes,
  error,
});
