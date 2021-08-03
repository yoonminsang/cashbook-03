import { CalendarContent } from './CalendarContent/CalendarContent';

const Calendar = ({ date }) => {
  const calendarContent = CalendarContent({ date });

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
        <div class="data__income">총 수입: 1,822,000</div>
        <div>총 지출: 812,000</div>
        <div class="data__total">총 수입: 1,010,000</div>
      </div>
    </div>
  `;
};
export default Calendar;
