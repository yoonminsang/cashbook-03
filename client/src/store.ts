export const store = (function () {
  let state = {};
  let observer = {};
  return {
    setState(type, changeState) {
      const nextState = { ...state };
      nextState[type] = changeState;
      state = nextState;
      this.notify(type);
    },

    getState(type) {
      return state[type];
    },

    subscribe(type, identifier, cb) {
      if (!observer[type]) {
        observer[type] = [];
      }
      const nextObserver = { ...observer };
      nextObserver[type].push({
        identifier,
        cb: () => cb(type, this.getState(type)),
      });
      observer = nextObserver;
      this.notify(type);
    },

    unsubscribe(type, identifier) {
      observer[type] = observer[type].filter(
        ({ identifier: idf }) => idf === identifier,
      );
    },

    unsubscribeAll() {
      observer = {};
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
