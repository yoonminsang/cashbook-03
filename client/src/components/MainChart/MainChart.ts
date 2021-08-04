import CategoryList from './CategoryList';
import Donut from './Donut';

const MainChart = ({ account }) => {
  console.log('maincahr change', account);
  const filterAccout =
    account && account.filter(({ is_income }) => is_income === 0);

  const totalAcmount =
    filterAccout &&
    filterAccout.reduce((acc, { amount }) => acc + parseInt(amount), 0);

  const totalAmountToKr = filterAccout && totalAcmount.toLocaleString('ko-KR');

  const categoryAmount = {};

  filterAccout &&
    filterAccout.forEach(({ amount, category_name, category_color }) => {
      if (!categoryAmount[category_name])
        categoryAmount[category_name] = [0, category_color];
      categoryAmount[category_name][0] += +amount;
    });

  for (let key in categoryAmount) {
    categoryAmount[key].push((categoryAmount[key][0] / totalAcmount) * 100);
  }
  console.log(categoryAmount);

  const categoryInner = Object.entries(categoryAmount)
    .sort((a, b) => b[1][0] - a[1][0])
    .map(([category_name, arr]) => {
      // const [amount,color,percentage]=arr;
      const amount = arr[0].toLocaleString('ko-KR'),
        category_color = arr[1],
        percentage = arr[2].toFixed(2) + '%';
      return CategoryList({
        category_color,
        category_name,
        percentage,
        amount,
      });
    })
    .join('');

  const forDonut = Object.entries(categoryAmount)
    .sort((a, b) => b[1][0] - a[1][0])
    .map(([_, arr]) => {
      // const [amount,color,percentage]=arr;
      const category_color = arr[1],
        percentage = arr[2];
      return {
        category_color,
        percentage,
      };
    });

  return /*html*/ `
    <div class="left">
      <svg width="100%" height="100%" viewBox="0 0 100 100">${Donut(
        forDonut,
      )}</svg>
    </div>
    <div class="right">
      <div class="donut-header">
        <div>이번 달 지출 금액</div>
        <div>${totalAmountToKr}</div>
      </div>
      <ul class="category-list">
        ${categoryInner}
      </ul>
    </div>
    `;
};
export default MainChart;
