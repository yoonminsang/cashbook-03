export const store = (function () {
  const state = {};
  let observer = {};
  return {
    setState(type, changeState: any) {
      state[type] = changeState;
      this.notify(type);
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
        cb: () => cb(type, this.getState(type)),
      });
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
  categoryList: 'categoryList',
};
