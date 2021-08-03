export const CalendarContent = ({ date }) => {
  const $target = document.createElement('div');
  $target.innerHTML = initialMarkup();

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

const week = () => /*html*/ `
  <div class="week">
    <div class="week__day"></div>
    <div class="week__day"></div>
    <div class="week__day"></div>
    <div class="week__day"></div>
    <div class="week__day"></div>
    <div class="week__day"></div>
    <div class="week__day"></div>
  </div>
`;

const weekDayDate = (date: number) => /*html*/ `
  <div class="week__day__date" data-date=${date}>${date}</div>
`;
