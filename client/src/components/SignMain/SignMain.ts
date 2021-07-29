const SignMain = (isSignup: boolean) => {
  const content = isSignup
    ? `
    <form class="sign__signup">
      <input class="sign__signup__email" type="email" placeholder="이메일" maxlength="40" required>
      <input class="sign__signup__nickname" type="text" placeholder="닉네임 (영문과 숫자만 사용가능)" pattern="[0-9A-Za-z]+" maxlength="20" required>
      <input class="sign__signup__password" type="password" placeholder="비밀번호" maxlength="40" required>
      <button class="sign__signup__submit" type="submit">회원가입</button>
    </form>
    `
    : `
    <form class="sign__login">
      <input class="sign__login__email" type="email" placeholder="이메일" maxlength="40" required>
      <input class="sign__login__password" type="password" placeholder="비밀번호" maxlength="40" required>
      <button class="sign__login__submit" type="submit">로그인</button>
    </form>
    <button class="sign__github">
      <div class="sign__github__icon"></div>
      <span class="sign__github__text">GitHub 로그인</span>
    </button>
    <div class="sign__signup-link">
      <span>혹시, 우아한 가계부가 처음이신가요?<a href="/signup">회원가입</a></span>
    </div>
  `;

  return `
    <main class="sign">
      ${content}
    </main>
  `;
};
export default SignMain;
