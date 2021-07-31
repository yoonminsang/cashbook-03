import client from './client';

// 모든 카테고리 가져오기
export const getCategory = () => client.get('/api/category');
