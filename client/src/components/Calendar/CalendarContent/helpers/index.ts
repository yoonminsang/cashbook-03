import { Account } from '../../Calendar';

export const parseAccount = (account: Account[]) => {
  const dataByDate = {};
  if (!Array.isArray(account)) return dataByDate;

  account.forEach(({ timestamp, amount, is_income }) => {
    const isIncome = Boolean(is_income);
    const amountNum = isIncome ? parseInt(amount) : -parseInt(amount);
    const date = parseInt(timestamp.split('-')[2]);

    dataByDate[date] = dataByDate[date]?.concat(amountNum) || [amountNum];
  });

  return dataByDate;
};

export const getArraySum = (numbers: number[]) => {
  return numbers.reduce((acc, val) => acc + val, 0);
};
