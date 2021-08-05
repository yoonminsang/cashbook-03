const CHART_WIDTH = 700;
const CHART_HEIGHT = 300;
const RECENT_MONTHS = 6;
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

  return /*html*/ `
    <div class="line-chart-container">
      <div class="line-chart-container__title">${`생활`} 카테고리 소비 추이</div>
      <div class="svg-container">
      </div>
    </div>
  `;
};

export default LineChart;
