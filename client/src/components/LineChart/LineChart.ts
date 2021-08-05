const CHART_WIDTH = 700;
const CHART_HEIGHT = 300;
const RECENT_MONTHS = 6;
const Y_LINE_NUM = 12;
const CIRCLE_R = 4;

interface coordinate {
  X: number;
  Y: number;
}

const dummyData = [
  { amount: '10000', timestamp: '2021-08-04' },
  { amount: '10000', timestamp: '2021-08-04' },
  { amount: '10000', timestamp: '2021-08-04' },
  { amount: '10000', timestamp: '2021-08-04' },
  { amount: '12000', timestamp: '2021-07-31' },
  { amount: '12000', timestamp: '2021-07-20' },
  { amount: '12000', timestamp: '2021-07-15' },
  { amount: '12000', timestamp: '2021-07-12' },
  { amount: '9000', timestamp: '2021-06-04' },
  { amount: '7000', timestamp: '2021-05-18' },
  { amount: '7000', timestamp: '2021-05-13' },
  { amount: '7000', timestamp: '2021-05-02' },
  { amount: '20000', timestamp: '2021-03-04' },
  { amount: '10000', timestamp: '2021-02-04' },
  { amount: '10000', timestamp: '2021-02-04' },
  { amount: '10000', timestamp: '2021-02-04' },
];

const dummyDate = { year: 2021, month: 8 };

const LineChart = ({ accountByCategory }) => {
  const currentMonth = dummyDate.month;
  const totalByMonth = new Map();

  let i = RECENT_MONTHS;
  while (i-- > 0) {
    const before = currentMonth - i;
    const month = before > 0 ? before : 12 + before;
    totalByMonth.set(month, 0);
  }

  dummyData.forEach(({ amount, timestamp }) => {
    const month = parseInt(timestamp.split('-')[1]);
    if (totalByMonth.has(month))
      totalByMonth.set(month, totalByMonth.get(month) + parseInt(amount));
  });

  const amounts = Array.from(totalByMonth.values());
  const months = Array.from(totalByMonth.keys());
  const coordinates = getAmountCoordinates(amounts);

  return /*html*/ `
    <div class="line-chart-container">
      <div class="line-chart-container__title">${`생활`} 카테고리 소비 추이</div>
      <div class="svg-container">
        ${Chart(amounts, months, coordinates)}
      </div>
    </div>
  `;
};

export default LineChart;

const Chart = (
  amounts: number[],
  months: number[],
  coordinates: coordinate[],
) => {
  return `
    <svg class="line-chart-container__chart" viewBox="0 -30 700 400">
      ${xLines()}
      ${yLines()}
      ${circles(coordinates)}
    </svg>
  `;
};

const xLines = () =>
  Array.from({ length: Y_LINE_NUM })
    .map(
      (_, i) =>
        `<rect class="line" y=${
          (CHART_HEIGHT / (Y_LINE_NUM - 1)) * i
        } width="${CHART_WIDTH}" height="1" />`,
    )
    .join('');

const yLines = () =>
  Array.from({ length: RECENT_MONTHS + 2 })
    .map(
      (_, i) =>
        `<rect class="line" x=${
          (CHART_WIDTH / (RECENT_MONTHS + 1)) * i
        } width="1" height="${CHART_HEIGHT}" />`,
    )
    .join('');

const circles = (coordinates: coordinate[]) => {
  return coordinates
    .map(
      ({ X, Y }) =>
        `<circle class="circle" cx="${X}" cy="${Y}" r="${CIRCLE_R}" />`,
    )
    .join('');
};

const getAmountCoordinates = (amounts: number[]) => {
  const maxAmount = Math.max(...amounts);
  const SPACE = CHART_WIDTH / (RECENT_MONTHS + 1);

  return amounts.map((amount, i) => {
    const X = (i + 1) * SPACE + 0.5;
    const Y = (CHART_HEIGHT / maxAmount) * (maxAmount - amount);

    return { X, Y };
  });
};
