const Header = ({ date, user }) => {
  return `
    <div class="year">${date ? date.year : ''}</div>
    <div class="month">${date ? date.month : ''}</div>
    <a href="/">메인</a>
    <a href="/calendar">달력</a>
    <a href="/statistics">통계</a>
    <a href="/abc">오류</a>
    `;
};
export default Header;
