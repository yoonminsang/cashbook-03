import View from '../utils/View';

class Error extends View {
  constructor({ $target }) {
    super({ $target });
    this.$target = $target;
    // this.render();
  }
  render() {
    this.$target.innerHTML = `
    <div class="error">
      <h1>404</h1>
      <div>존재하지 않는 페이지입니다.</div>
      <div>1초뒤 메인화면으로 이동합니다.</div>
    </div>
    `;
    setTimeout(() => {
      location.href = '/';
    }, 1000);
  }
}
export default Error;
