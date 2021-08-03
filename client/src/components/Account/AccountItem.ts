const AccountItem = ({
  id,
  category_name,
  content,
  payment_name,
  amount,
  is_income,
  category_color,
}) => {
  const operator = is_income ? '+' : '-';
  payment_name = payment_name === null ? '수입' : payment_name;
  amount && (amount = parseInt(amount, 10).toLocaleString('ko-KR') + '원');
  return /*html*/ `
    <li class="account-item-inner" id=${id}>
        <button class="category" style="background:${category_color}">${category_name}</button>
        <div class="content">${content}</div>
        <div class="payment">${payment_name}</div>
        <div class="amount">${operator}${amount}</div>
        <button class="wci wci-close js-remove-account" data-account-id="${id}"></button>
    </li>`;
};

export default AccountItem;
