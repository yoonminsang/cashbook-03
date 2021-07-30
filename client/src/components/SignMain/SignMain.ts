const SignMain = (isSignup: boolean) => {
  const content = isSignup
    ? `
    <form class="sign__signup">
      <input class="sign__signup__email js-email" type="email" placeholder="이메일" maxlength="40" required>
      <input class="sign__signup__nickname js-nickname" type="text" placeholder="닉네임" maxlength="20" required>
      <input class="sign__signup__password js-password" type="password" placeholder="비밀번호" maxlength="40" required>
      <input class="sign__signup__password-confirm js-password-confirm" type="password" placeholder="비밀번호 확인" maxlength="40" required>
      <button class="sign__signup__submit" type="submit">회원가입</button>
      <div class="sing-error js-error"></div>
    </form>
    `
    : `
    <form class="sign__login">
      <input class="sign__login__email js-email" type="email" placeholder="이메일" maxlength="40" required>
      <input class="sign__login__password js-password" type="password" placeholder="비밀번호" maxlength="40" required>
      <button class="sign__login__submit" type="submit">로그인</button>
      <div class="sing-error js-error"></div>
    </form>
    <button class="sign__github js-github">
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
