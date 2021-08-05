import CategoryList from './CategoryList';

let forDonut;

const MainChart = ({ account }) => {
  const filterAccout =
    account && account.filter(({ is_income }) => is_income === 0);

  const totalAcmount =
    filterAccout &&
    filterAccout.reduce((acc, { amount }) => acc + parseInt(amount), 0);

  const error = !totalAcmount && `<div class="empty">지출내역이 없습니다</div>`;

  const totalAmountToKr = filterAccout && totalAcmount.toLocaleString('ko-KR');

  const categoryAmount = {};

  filterAccout &&
    filterAccout.forEach(
      ({ amount, category_name, category_color, category_id }) => {
        if (!categoryAmount[category_name])
          categoryAmount[category_name] = [0, category_color, category_id];
        categoryAmount[category_name][0] += +amount;
      },
    );

  for (let key in categoryAmount) {
    categoryAmount[key].push((categoryAmount[key][0] / totalAcmount) * 100);
  }

  const categoryInner = Object.entries(categoryAmount)
    .sort((a, b) => b[1][0] - a[1][0])
    .map(([category_name, arr]) => {
      const amount = arr[0].toLocaleString('ko-KR'),
        category_color = arr[1],
        category_id = arr[2],
        percentage = arr[3].toFixed(2) + '%';
      return CategoryList({
        category_id,
        category_color,
        category_name,
        percentage,
        amount,
      });
    })
    .join('');

  forDonut = Object.entries(categoryAmount)
    .sort((a, b) => b[1][0] - a[1][0])
    .map(([_, arr]) => {
      const category_color = arr[1],
        percentage = arr[3];
      return {
        category_color,
        percentage,
      };
    });

  if (forDonut) setTimeout(showDonut, 0);

  return /*html*/ `
    <div class="left ">
      <div id="donut"></div>
    </div>
    <div class="right">
      <div class="donut-header">
        <div>이번 달 지출 금액</div>
        <div>${totalAmountToKr || 0}</div>
      </div>
      <ul class="category-list">
        ${categoryInner || error}
      </ul>
    </div>
    `;
};

export default MainChart;

const showDonut = () => {
  const $target = document.querySelector('#app');
  const doughnut = $target.querySelector('#donut'),
    svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  let filled = 0;
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.setAttribute('viewBox', '0 0 100 100');
  if (forDonut.length === 0)
    forDonut = [{ category_color: '#0095aa', percentage: 100 }];
  forDonut.forEach((data) => {
    const circle = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'circle',
      ),
      startAngle = -90,
      radius = 30,
      cx = 50,
      cy = 50,
      animationDuration = 1000,
      strokeWidth = 15,
      dashArray = 2 * Math.PI * radius,
      dashOffset = dashArray - (dashArray * data.percentage) / 100,
      angle = (filled * 360) / 100 + startAngle,
      currentDuration = (animationDuration * data.percentage) / 100,
      delay = (animationDuration * filled) / 100;
    circle.setAttribute('r', radius + '');
    circle.setAttribute('cx', cx + '');
    circle.setAttribute('cy', cy + '');
    circle.setAttribute('fill', 'transparent');
    circle.setAttribute('stroke', data.category_color);
    circle.setAttribute('stroke-width', strokeWidth + '');
    circle.setAttribute('stroke-dasharray', dashArray + '');
    circle.setAttribute('stroke-dashoffset', dashArray + '');
    circle.style.transition = `stroke-dashoffset ${currentDuration}ms linear ${delay}ms`;
    circle.setAttribute('transform', `rotate(${angle} ${cx} ${cy})`);
    svg.appendChild(circle);
    filled += data.percentage;
    setTimeout(function () {
      circle.style['stroke-dashoffset'] = dashOffset;
    }, 100);
  });
  doughnut.appendChild(svg);
};
