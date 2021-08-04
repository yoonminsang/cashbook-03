const CategoryList = ({
  category_color,
  category_name,
  percentage,
  amount,
}) => {
  return /*html*/ `        
    <li class="category-item-inner">
      <button class="category" style="background:${category_color}">${category_name}</button>
      <div class="content">${percentage}</div>
      <div class="amount">${amount}</div>
    </li>`;
};
export default CategoryList;
