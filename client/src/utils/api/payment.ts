import client from './client';

// 모든 지불수단 가져오기
export const getPayment = () => client.get('/api/payment');
