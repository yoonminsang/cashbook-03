const AccountHeader = ({ date, day, income, expenditure }) => {
  income && (income = parseInt(income, 10).toLocaleString('ko-KR') + '원');
  expenditure &&
    (expenditure = parseInt(expenditure, 10).toLocaleString('ko-KR') + '원');
  return /*html*/ `
    <div class="account-item-header">
      <div class="left"><div class="date">${date}</div><div class="day">${day}</div></div>
      <div class="right"><div>수입</div><div>${income}</div><div>지출</div><div>${expenditure}</div></div>
    </div>`;
};

export default AccountHeader;
