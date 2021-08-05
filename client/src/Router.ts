import store from './store';
import accountStore from './store/account';
import dateStore from './store/date';

class Router {
  $app: HTMLElement;
  routes: object;
  keys: string[];
  state: string[];
  error: InstanceType<any>;
  constructor({ $app, routes, error }) {
    this.$app = $app;
    this.routes = routes;
    this.error = error;
    this.route();
    this.addLinkChangeHandler();
    this.addBackChangeHandler();
  }

  route = () => {
    store.forEach((observable) => observable.unsubscribeAll());
    dateStore.subscribe(() =>
      accountStore.get({
        ...dateStore.state,
      }),
    );
    const url = window.location.pathname;
    const Page = this.routes[url];
    if (Page) {
      new Page({ $app: this.$app });
      return;
    }
    this.$app.innerHTML = '';
    this.error.render();
  };

  addLinkChangeHandler = () => {
    this.$app.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const closest = target.closest('a');
      if (!closest) return;
      e.preventDefault();
      const path = closest.getAttribute('href');
      window.history.pushState(null, '', path);
      this.route();
    });
  };

  addBackChangeHandler = () => {
    window.addEventListener('popstate', (e) => {
      e.preventDefault();
      this.route();
    });
  };
}

export default Router;
