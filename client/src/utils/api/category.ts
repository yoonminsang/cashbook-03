import { request } from './client';

const ERROR_MESSAGE = {
  500: '서버 오류가 발생해 카테고리를 불러올 수 없습니다',
};

// 모든 카테고리 가져오기
export const getCategory = async () => {
  try {
    const {
      data: { data },
    } = await request('get', '/api/category');

    return data;
  } catch (statusCode) {
    throw ERROR_MESSAGE[statusCode];
  }
};
