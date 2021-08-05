const CHART_WIDTH = 700;
const CHART_HEIGHT = 300;
const RECENT_MONTHS = 6;
const Y_LINE_NUM = 12;
const CIRCLE_R = 4;

interface coordinate {
  X: number;
  Y: number;
}

const LineChart = ({ accountByCategory, currentMonth }) => {
  const totalByMonth = new Map();
  const categoryName = accountByCategory[0].category_name;

  let i = RECENT_MONTHS;
  while (i-- > 0) {
    const before = currentMonth - i;
    const month = before > 0 ? before : 12 + before;
    totalByMonth.set(month, 0);
  }

  accountByCategory.forEach(({ amount, timestamp }) => {
    const month = parseInt(timestamp.split('-')[1]);
    if (totalByMonth.has(month))
      totalByMonth.set(month, totalByMonth.get(month) + parseInt(amount));
  });

  const amounts = Array.from(totalByMonth.values());
  const months = Array.from(totalByMonth.keys());
  const coordinates = getAmountCoordinates(amounts);

  return /*html*/ `
    <article class="line-chart">
      <div class="line-chart__title">${categoryName} 카테고리 소비 추이</div>
      <div class="svg-container">
        ${Chart(amounts, months, coordinates)}
      </div>
    </article>
  `;
};

export default LineChart;

const Chart = (
  amounts: number[],
  months: number[],
  coordinates: coordinate[],
) => {
  return `
    <svg class="line-chart__chart" viewBox="0 -30 700 400">
      ${xLines()}
      ${yLines()}
      ${circles(coordinates)}
      ${path(coordinates)}
      ${amountTexts(coordinates, amounts)}
      ${xLabels(months)}
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

const path = (coordinates: coordinate[]) => {
  const start = `${coordinates[0].X},${coordinates[0].Y}`;
  const lines = coordinates
    .slice(1)
    .map(({ X, Y }) => `L${X},${Y}`)
    .join(' ');

  const pathLength = getPathLength(coordinates);
  return `<path class="path" d="M${start} ${lines}" stroke-dasharray="${pathLength}" stroke-dashoffset="${pathLength}" />`;
};

const amountTexts = (coordinates: coordinate[], amounts: number[]) => {
  return coordinates
    .map(
      ({ X, Y }, i) => `
        <text class="amount-text" x="${X}" y="${
        Y - 12
      }" text-anchor="middle">${amounts[i].toLocaleString('ko-KR')}</text>
      `,
    )
    .join('');
};

const xLabels = (months: number[]) => {
  const SPACE = CHART_WIDTH / (RECENT_MONTHS + 1);

  return Array.from(months)
    .map(
      (month, i) => `
        <text class="x-label" x="${(i + 1) * SPACE + 0.5}" y="${
        CHART_HEIGHT + 35
      }" text-anchor="middle">${month}</text>
      `,
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

const getPathLength = (coordinates: coordinate[]) => {
  let result = 0;
  for (let i = 0; i < coordinates.length - 1; i++) {
    result += getDistance(coordinates[i], coordinates[i + 1]);
  }
  return result;
};

const getDistance = (p1: coordinate, p2: coordinate) => {
  const dX = p1.X - p2.X;
  const dY = p1.Y - p2.Y;

  return Math.sqrt(dX ** 2 + dY ** 2);
};
