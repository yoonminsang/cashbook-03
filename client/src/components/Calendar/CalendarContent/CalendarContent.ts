import { YearMonth, Account } from '../Calendar';
import { week, weekDayDate, weekDayInfo } from './sub-components';
import { parseAccount, getArraySum } from '../helpers';

export const CalendarContent = ({
  date,
  account,
}: {
  date: YearMonth;
  account: Account[];
}) => {
  const $target = document.createElement('div');
  $target.innerHTML = initialMarkup();

  fillDates($target, date);
  markToday($target, date);
  fillAccounts($target, parseAccount(account));

  return $target.innerHTML;
};

const initialMarkup = () => /*html*/ `
  <div class="calendar__content">
    ${week()}
    ${week()}
    ${week()}
    ${week()}
    ${week()}
  </div>
`;

const fillDates = ($target: HTMLElement, { year, month }: YearMonth) => {
  const firstDayIndex = new Date(year, month - 1).getDay();
  const lastDate = new Date(year, month, 0).getDate();

  const $dates = $target.querySelectorAll('.week__day');

  for (let index = firstDayIndex, date = 1; date <= lastDate; index++, date++) {
    if ($dates[index])
      $dates[index].insertAdjacentHTML('afterbegin', weekDayDate(date));
    else {
      // add another week
      $target
        .querySelector('.calendar__content')
        .insertAdjacentHTML('beforeend', week());

      const $lastWeekDates = $target.querySelectorAll(
        '.week:last-child > .week__day',
      );

      for (let newIndex = 0; date <= lastDate; newIndex++, date++) {
        $lastWeekDates[newIndex].insertAdjacentHTML(
          'afterbegin',
          weekDayDate(date),
        );
      }

      break;
    }
  }
};

const markToday = ($target: HTMLElement, { year, month }: YearMonth) => {
  const today = new Date();
  if (today.getFullYear() !== year || today.getMonth() + 1 !== month) return;

  const $dateTarget = getDateTargetOnCalendar($target, today.getDate());
  if (!$dateTarget) return;

  $dateTarget.classList.add('today');
};

const fillAccounts = (
  $target: HTMLElement,
  accountsByDate: { [key: string]: number[] },
) => {
  for (const [date, history] of Object.entries(accountsByDate)) {
    const incomes = history.filter((amount) => amount > 0);
    const expenditures = history.filter((amount) => amount < 0);

    const $dateTarget = getDateTargetOnCalendar($target, parseInt(date));
    if (!$dateTarget) continue;

    const total = getArraySum(history);
    $dateTarget.insertAdjacentHTML('afterbegin', weekDayInfo('total', total));

    if (expenditures.length) {
      const totalExpenditure = getArraySum(expenditures);
      $dateTarget.insertAdjacentHTML(
        'afterbegin',
        weekDayInfo('expenditure', totalExpenditure),
      );
    }

    if (incomes.length) {
      const totalIncome = getArraySum(incomes);
      $dateTarget.insertAdjacentHTML(
        'afterbegin',
        weekDayInfo('income', totalIncome),
      );
    }
  }
};

const getDateTargetOnCalendar = ($target: HTMLElement, date: number) => {
  return $target
    .querySelector(`.week__day__date[data-date="${date}"`)
    ?.closest('.week__day');
};
