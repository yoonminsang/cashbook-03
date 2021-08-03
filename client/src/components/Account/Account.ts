import { dayToKorean } from '../../utils/chore';
import AccountHeader from './AccountHeader';
import AccountItem from './AccountItem';

const Account = ({ accountList, income, expenditure }) => {
  const allCount = accountList ? `${accountList.length} 건` : '';
  const incomePrice = accountList
    ? accountList
        .filter(({ is_income }) => is_income === 1)
        .reduce((acc, { amount }) => acc + parseInt(amount, 10), 0)
        .toLocaleString('ko-KR') + '원'
    : '';

  const expenditurePrice = accountList
    ? accountList
        .filter(({ is_income }) => is_income == 0)
        .reduce((acc, { amount }) => acc + parseInt(amount, 10), 0)
        .toLocaleString('ko-KR') + '원'
    : '';

  if (income && expenditure) {
    accountList = accountList;
  } else if (income) {
    accountList = accountList.filter(({ is_income }) => is_income === 1);
  } else if (expenditure) {
    accountList = accountList.filter(({ is_income }) => is_income === 0);
  }

  const accountListByDate = {};
  accountList &&
    accountList.forEach(
      ({
        id,
        content,
        amount,
        timestamp,
        category_name,
        payment_name,
        is_income,
        category_color,
      }) => {
        if (!accountListByDate[timestamp]) {
          accountListByDate[timestamp] = [];
        }
        accountListByDate[timestamp].push({
          id,
          content,
          amount,
          timestamp,
          category_name,
          payment_name,
          is_income,
          category_color,
        });
      },
    );

  const accountListHeaderByDate = Object.keys(accountListByDate).map((v) => [
    v,
    `${v.slice(5, 7)}월 ${v.slice(8)}일`,
    dayToKorean[new Date(v).getDay()],
  ]);
  accountListHeaderByDate.forEach((v, i) => {
    accountListHeaderByDate[i].push(
      accountListByDate[v[0]].reduce(
        (acc, { amount, is_income }) =>
          is_income ? acc + parseInt(amount, 10) : acc,
        0,
      ),
    );
    accountListHeaderByDate[i].push(
      accountListByDate[v[0]].reduce(
        (acc, { amount, is_income }) =>
          is_income ? acc : acc + parseInt(amount, 10),
        0,
      ),
    );
  });

  console.log('accountListByDate', accountListByDate);
  console.log('accountListHeaderByDate', accountListHeaderByDate);

  const inner = accountListHeaderByDate
    .map(([fullDate, date, day, income, expenditure]) => {
      const header = AccountHeader({ date, day, income, expenditure });
      let content = `<ul class="account-item-content">`;
      content += accountListByDate[fullDate]
        .map(
          ({
            id,
            category_name,
            content,
            payment_name,
            amount,
            is_income,
            category_color,
          }) =>
            AccountItem({
              id,
              category_name,
              content,
              payment_name,
              amount,
              is_income,
              category_color,
            }),
        )
        .join('');
      content += `</ul>`;
      return `<div class="acount-content">${header}${content}</div>`;
    })
    .join('');

  return /*html*/ `
    <div class="account-header">
      <div class="left">
        <div>전체 내역</div><div class="total-count">${allCount}</div>
      </div>
      <div class="right">
        <button class="btn-active btn-income ${
          income ? 'active' : ''
        }"><i class="wci wci-check"></i></button>
        <div class="total-income  ${
          income ? 'active' : ''
        }">수입 ${incomePrice}</div>
        <button class="btn-active btn-expenditure ${
          expenditure ? 'active' : ''
        }"><i class="wci wci-check"></i></button>
        <div class="total-expenditure ${
          expenditure ? 'active' : ''
        }">지출 ${expenditurePrice}</div>
      </div>
    </div>
    <article>
    ${inner}
    </article>
    `;
};
export default Account;
