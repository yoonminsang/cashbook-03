import { dayToKorean } from '../../utils/chore';

const StatAccountList = (accountList, currentYear, currentMonth) => {
  const accountsByDate = {};

  accountList.forEach((account) => {
    const [_, month, date] = account.timestamp.split('-');
    if (parseInt(month) === currentMonth)
      accountsByDate[date] = accountsByDate[date]
        ? accountsByDate[date].concat(account)
        : [account];
  });

  const markup = Object.keys(accountsByDate)
    .sort((a, b) => parseInt(b) - parseInt(a))
    .map((date) => {
      const currentDate = new Date(
        currentYear,
        currentMonth - 1,
        parseInt(date),
      );
      console.log(currentDate);
      const dateString = `${currentMonth}월 ${currentDate.getDate()}일 <span class="weekday">${
        dayToKorean[currentDate.getDay()]
      }</span>`;

      return `
      <div class="stat-account__header">
        <span>${dateString}</span>
      </div>
      <ul class="stat-account__list">
        ${accountsByDate[date]
          .map((account) => StatAccountItem(account))
          .join('')}
      </ul>
    `;
    })
    .join('');

  return `<div class="stat-account">${markup}</div>`;
};

const StatAccountItem = ({
  category_color,
  category_name,
  content,
  payment_name,
  amount,
}) => {
  amount && (amount = parseInt(amount, 10).toLocaleString('ko-KR') + '원');
  return /*html*/ `
    <li class="stat-account__item">
      <button class="stat-account__item__category" style="background:${category_color}">${category_name}</button>
      <div class="stat-account__item__content">${content}</div>
      <div class="stat-account__item__payment">${payment_name}</div>
      <div class="stat-account__item__amount">${amount}</div>
    </li>`;
};

export default StatAccountList;
