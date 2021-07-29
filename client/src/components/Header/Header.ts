const Header = ({ date, user }) => {
  return `
    <div class="main-header">
      <div class="main-header__container">
        <div class="main-header__logo">우아한 가계부</div>
        <div class="main-header__time">
          <div class="main-header__time__left">
            <i class="wci wci-chevron-left"></i>
          </div>
          <div class="main-header__time__text">
            <div class="main-header__time__text__month">${
              date ? `${date.month}월` : ''
            }</div>
            <div class="main-header__time__text__year">${
              date ? date.year : ''
            }</div>
          </div>
          <div class="main-header__time__right">
            <i class="wci wci-chevron-right"></i>
          </div>
        </div>
        <nav class="main-header__nav">
          <ul class="main-header__nav__list">
            <li><a href="/"><i class="wci wci-file-text"></i></a></li>
            <li><a href="/calendar"><i class="wci wci-calendar"></i></a></li>
            <li><a href="/statistics"><i class="wci wci-chart"></i></a></li>
          </ul>
        </nav>
      </div>
    </div>
    `;
};
export default Header;
