export default class Observable {
  state: any;
  observers: Function[];

  constructor() {
    this.state = undefined;
    this.observers = [];
  }

  setState(nextState: any) {
    this.state = nextState;
    this.notify();
  }

  notify() {
    this.observers.forEach((observer) => observer());
  }

  subscribe(observer: Function) {
    observer();
    const index = this.observers.push(observer) - 1;
    return index;
  }

  unsubscribe(index: number) {
    this.observers.splice(index, 1);
  }

  unsubscribeAll() {
    this.observers = [];
  }
}
