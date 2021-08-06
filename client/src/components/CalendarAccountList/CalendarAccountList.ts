import { dayToKorean } from '../../utils/chore';

const CalendarAccountList = (
  accountList,
  currentYear: number,
  currentMonth: number,
  currentDate: number,
) => {
  const accountsByDate = accountList.filter(
    (account) => parseInt(account.timestamp.split('-')[2]) === currentDate,
  );

  if (!accountsByDate.length)
    return `
      <div class="stat-account">
        <div class="stat-account__no-data">해당 날짜에 내역이 없습니다</div>
      </div>`;

  const fullDate = new Date(currentYear, currentMonth - 1, currentDate);

  const dateString = `${currentMonth}월 ${currentDate}일 <span class="weekday">${
    dayToKorean[fullDate.getDay()]
  }</span>`;

  const markup = `
      <div class="stat-account__header">
        <span>${dateString}</span>
      </div>
      <ul class="stat-account__list">
        ${accountsByDate.map((account) => StatAccountItem(account)).join('')}
      </ul>
    `;

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

export default CalendarAccountList;
