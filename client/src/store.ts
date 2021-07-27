export const store = (function () {
  const state = {};
  return {
    setState(type, nextState) {
      state[type] = nextState;
    },
    getState(type) {
      return state[type];
    },
  };
})();

// 사용법
//Store.setState('user', { id: 1, nickname: '민상', email: 'woowa@' });
//console.log(Store.getState('user'));
