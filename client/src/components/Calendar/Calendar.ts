import { CalendarContent } from './CalendarContent/CalendarContent';
import { getTotals } from './helpers';

export interface YearMonth {
  year: number;
  month: number;
}

export interface Account {
  id: number;
  content: string;
  amount: string;
  timestamp: string;
  category_name: string;
  payment_name: string;
  is_income: number;
}

const Calendar = ({
  date,
  account,
}: {
  date: YearMonth;
  account: Account[];
}) => {
  const calendarContent = CalendarContent({ date, account });

  const { totalIncome, totalExpenditure, total } = getTotals(account);

  return /*html*/ `
    <div class="calendar-tab">
      <div class="calendar">
        <div class="calendar__header">
          <div>일</div>
          <div>월</div>
          <div>화</div>
          <div>수</div>
          <div>목</div>
          <div>금</div>
          <div>토</div>
        </div>
        ${calendarContent}
      </div>
      <div class="data">
        <div class="data__income">총 수입: ${totalIncome}</div>
        <div>총 지출: ${totalExpenditure}</div>
        <div class="data__total">총계: ${total}</div>
      </div>
    </div>
  `;
};
export default Calendar;
