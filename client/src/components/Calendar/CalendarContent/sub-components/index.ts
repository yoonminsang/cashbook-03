export const week = () => /*html*/ `
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

export const weekDayDate = (date: number) => /*html*/ `
  <div class="week__day__date" data-date=${date}>${date}</div>
`;

export const weekDayInfo = (type: string, amount: number) => /*html*/ `
  <div class="week__day__${type}">${amount.toLocaleString('ko-KR')}</div>
`;
