import { store } from './store';

class Router {
  $app: HTMLElement;
  routes: object;
  keys: string[];
  state: string[];
  error: InstanceType<any>;
  constructor({ $app, routes, error }) {
    this.$app = $app;
    this.routes = routes;
    this.keys = Object.keys(routes);
    this.error = error;
    this.route();
    this.linkChange();
    this.backChange();
  }

  route = () => {
    const url = window.location.pathname;
    for (let i = 0; i < this.keys.length; i++) {
      if (this.keys[i] === url) {
        new this.routes[this.keys[i]]({ $app: this.$app });
        return;
      }
    }
    store.unsubscribeAll();
    this.$app.innerHTML = '';
    this.$app.appendChild(this.error.html);
  };

  linkChange = () => {
    this.$app.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const closest = target.closest('a');
      if (!closest) return;
      e.preventDefault();
      const path = target.getAttribute('href');
      window.history.pushState(null, '', path);
      this.route();
    });
  };

  backChange = () => {
    window.onpopstate = (e) => {
      e.preventDefault();
      this.route();
    };
  };
}

export default Router;
