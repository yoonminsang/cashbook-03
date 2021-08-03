import { Account } from '../Calendar';

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

export const getTotals = (account: Account[]) => {
  if (!Array.isArray(account))
    return { totalIncome: '0', totalExpenditure: '0', total: '0' };

  const amounts = account.map(({ amount, is_income }) =>
    is_income ? parseInt(amount) : -parseInt(amount),
  );

  const totalIncome = getArraySum(amounts.filter((amount) => amount > 0));
  const totalExpenditure = -getArraySum(amounts.filter((amount) => amount < 0));
  const total = totalIncome - totalExpenditure;

  return {
    totalIncome: totalIncome.toLocaleString('ko-KR'),
    totalExpenditure: totalExpenditure.toLocaleString('ko-KR'),
    total: total.toLocaleString('ko-KR'),
  };
};

export const getArraySum = (numbers: number[]) => {
  return numbers.reduce((acc, val) => acc + val, 0);
};
