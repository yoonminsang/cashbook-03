import client from './client';

// account 불러오기
export const getAccount = ({ year, month, category }) =>
  client.get(`/api/account?year=${year}&month=${month}&category=${category}`);

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
