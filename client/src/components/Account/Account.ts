const Account = ({}) => {
  return /*html*/ `
    <div class="account-header">
      <div class="left">
        <div>전체 내역</div><div class="total-count">14건</div>
      </div>
      <div class="right">
        <button class="btn-income active"><i class="wci wci-check"></i></button>
        <div>수입 <span class="total-income">15,000</span></div>
        <button class="btn-income"><i class="wci wci-check"></i></button>
        <div>지출 <span class="totla-expenditure">300,000</span></div>
      </div>
    </div>
    <div class="acount-content">
      <div class="account-item-header">
        <div class="left"><div class="date">7월 15일 </div><div class="day">목</div></div>
        <div class="right"><div>수입</div><div>15,000</div><div>지출</div><div>20,000</div></div>
      </div>
      <ul class="account-item-content">
        <li class="account-item-inner">
          <button class="category">문화/여가</button>
          <div class="content">스트리밍 정기 결제</div>
          <div class="payment">현대카드</div>
          <div class="price">-10,900원</div>
          <button class="wci wci-close js-remove-account"></button>
        </li>
      </ul>
    </div>
    `;
};
export default Account;
