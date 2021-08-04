import { request } from './client';

const ERROR_MESSAGE = {
  400: '아이디 또는 비밀번호가 일치하지 않습니다',
  409: '이미 가입된 이메일입니다',
  500: '오류가 발생했습니다. 잠시 후 다시 시도하세요',
};

// 로그인
export const login = async ({ email, password }) => {
  try {
    return await request('post', '/api/auth/login', { email, password });
  } catch (statusCode) {
    throw ERROR_MESSAGE[statusCode];
  }
};

// 회원가입
export const signup = async ({ email, nickname, password }) => {
  try {
    return await request('post', '/api/user/signup', {
      email,
      nickname,
      password,
    });
  } catch (statusCode) {
    throw ERROR_MESSAGE[statusCode];
  }
};

// 로그인 상태 확인
export const check = async () => {
  try {
    const response = await request('get', '/api/auth/check');
    return response.data.user;
  } catch (e) {
    console.error(e);
    return null;
  }
};

// 로그아웃
export const logout = async () => {
  try {
    await request('post', '/api/auth/logout');

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
