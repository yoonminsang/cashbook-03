const CategoryList = ({
  category_id,
  category_color,
  category_name,
  percentage,
  amount,
}) => {
  return /*html*/ `        
    <li class="category-item-inner js-category" data-id="${category_id}">
      <button class="category" style="background:${category_color}">${category_name}</button>
      <div class="content">${percentage}</div>
      <div class="amount">${amount}</div>
    </li>`;
};
export default CategoryList;
