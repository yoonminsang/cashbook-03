import client from './client';

// 모든 account 불러오기
export const getAccount = ({ year, month }) =>
  client.get(`/api/account?year=${year}&month=${month}`);

// 카테고리별 account 불러오기
export const getAccountByCategory = ({ year, categoryId }) =>
  client.get(`/api/account?year=${year}&categoryId=${categoryId}`);

// account 저장
export const setAccount = ({
  content,
  amount,
  timestamp,
  category_id,
  payment_id,
}) =>
  client.post('/api/account', {
    content,
    amount,
    timestamp,
    category_id,
    payment_id,
  });

// account 삭제
export const removeAccount = ({ account_id }) =>
  client.post('/api/account', {
    account_id,
  });
