import client from './client';

// 모든 지불수단 가져오기
export const getPayment = () => client.get('/api/payment');

// 지불수단 추가하기
export const setPayment = ({ name }) => client.post('/api/payment', { name });

// 지불수단 삭제하기
export const removePayment = ({ id }) =>
  client.delete('/api/payment', { data: { id } });
