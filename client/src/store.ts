export const store = (function () {
  const state = {};
  const observer = {};
  return {
    setState(type, nextState) {
      state[type] = nextState;
      this.noify(type);
    },
    getState(type) {
      return state[type];
    },
    subscribe(type, identifier, cb) {
      if (!observer[type]) {
        observer[type] = [];
      }
      observer[type].push({
        identifier,
        cb: () => cb(state[type], this.getState(type)),
      });
      this.notify(type);
    },
    unsubscribe(type, identifier) {
      observer[type] = observer[type].filter(
        ({ identifier: idf }) => idf === identifier,
      );
    },
    notify(type) {
      if (observer[type]) observer[type].forEach(({ cb }) => cb());
    },
  };
})();

export const GLOBALSTATE = {
  date: 'date',
  user: 'user',
  data: 'data',
};
