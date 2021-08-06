import { request } from './client';

const ERROR_MESSAGE = {
  400: '정보가 누락되었습니다',
  401: '결제수단을 모두 지울 수 없습니다',
  403: '로그인이 필요합니다',
  404: '존재하지 않는 결제수단입니다',
  409: '이미 존재하는 결제수단입니다',
  500: '서버 오류가 발생해 결제수단을 불러올 수 없습니다',
};

// 모든 지불수단 가져오기
export const getPayment = async () => {
  try {
    const {
      data: { data },
    } = await request('get', '/api/payment');

    return data;
  } catch (statusCode) {
    throw ERROR_MESSAGE[statusCode];
  }
};

// 지불수단 추가하기
export const setPayment = async ({ name }) => {
  try {
    return await request('post', '/api/payment', { name });
  } catch (statusCode) {
    throw ERROR_MESSAGE[statusCode];
  }
};

// 지불수단 삭제하기
export const removePayment = async ({ id }) => {
  try {
    return await request('delete', '/api/payment', { data: { id } });
  } catch (statusCode) {
    throw ERROR_MESSAGE[statusCode];
  }
};
