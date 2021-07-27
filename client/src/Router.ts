class Router {
  $app: HTMLElement;
  routes: object;
  keys: string[];
  state: string[];
  constructor({ $app, routes, path }) {
    this.$app = $app;
    this.routes = routes;
    this.keys = Object.keys(routes);
    this.state = [path];
    this.go(path);
    this.goDetect();
    this.backChange();
  }

  setState(state) {
    this.state = state;
  }

  goMain() {
    history.pushState('', '', this.keys[0]);
    this.setState([...this.state, this.keys[0]]);
    new this.routes[this.keys[0]]({ $app: this.$app });
  }

  // go, back에서 history를 먼저 조작하는 이유는 this.setState가 비동기이기 때문
  go(url) {
    for (let i = 0; i < this.keys.length; i++) {
      if (this.keys[i] === url) {
        history.pushState('', '', url); // 첫번째 인자 데이터(현재 필요 없음), 두번째 인자 title(브라우저 적용 예정)
        this.setState([...this.state, url]);
        // this.$app.innerHTML = '';
        new this.routes[this.keys[i]]({ $app: this.$app });
        return;
      }
    }
    console.log('올바르지 않은 url입니다. main 화면으로 redirect 합니다.');
    this.goMain();
  }

  goDetect() {
    this.$app.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      // closest로 상황에 따라 변경
      if (target.classList.contains('go')) {
        this.go(target.id);
      }
    });
  }

  back() {
    history.pushState('', '', this.state[this.state.length - 2]);
    const nextState = this.state.slice(0, -1);
    this.setState(nextState);
  }

  backChange() {
    window.onpopstate = (e) => {
      e.preventDefault();
      this.back();
    };
  }
}

export default Router;
