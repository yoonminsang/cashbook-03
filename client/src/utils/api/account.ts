import { request } from './client';

const ERROR_MESSAGE = {
  400: '요청 데이터 누락',
  403: '로그인 필요',
  500: '서버 에러',
};

// 모든 account 불러오기
export const getAccount = async ({ year, month }) => {
  try {
    const {
      data: { data },
    } = await request('get', `/api/account?year=${year}&month=${month}`);

    return data;
  } catch (statusCode) {
    console.error(statusCode, ERROR_MESSAGE[statusCode]);
    return [];
  }
};

// 카테고리별 account 불러오기
export const getAccountByCategory = async ({ year, categoryId }) => {
  try {
    const {
      data: { data },
    } = await request(
      'get',
      `/api/account?year=${year}&categoryId=${categoryId}`,
    );
    return data;
  } catch (statusCode) {
    console.error(statusCode, ERROR_MESSAGE[statusCode]);
    return [];
  }
};

// account 저장
export const setAccount = async ({
  content,
  amount,
  timestamp,
  category_id,
  payment_id,
}) => {
  try {
    await request('post', '/api/account', {
      content,
      amount,
      timestamp,
      category_id,
      payment_id,
    });

    return true;
  } catch (statusCode) {
    console.error(statusCode, ERROR_MESSAGE[statusCode]);
    return false;
  }
};

export const removeAccount = async ({ account_id }) => {
  try {
    await request('delete', '/api/account', { data: { account_id } });
    return true;
  } catch (statusCode) {
    console.error(statusCode, ERROR_MESSAGE[statusCode]);
    return false;
  }
};
