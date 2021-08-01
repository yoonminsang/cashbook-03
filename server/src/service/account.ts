import AccountRepository from '../repository/account';

const accountRepository = new AccountRepository();

export default class AccountService {
  async getAccounts(userId: string, filters: any) {
    if (!filters.year) throw new Error('NO_YEAR');

    const { year, month, categoryId } = filters;
    const startDate = new Date(parseInt(year), month ? parseInt(month) - 1 : 0);
    const endDate = month
      ? new Date(startDate.getFullYear(), startDate.getMonth() + 1)
      : new Date(startDate.getFullYear() + 1, 0);

    const accounts = await accountRepository.getAccounts(
      userId,
      startDate,
      endDate,
    );

    if (categoryId)
      return accounts.filter(
        (data: any) => data.category_id === parseInt(categoryId),
      );
    else return accounts;
  }

  async postAccount(
    user_id: string,
    content: string,
    amount: string,
    timestamp: string,
    category_id: string,
    payment_id: string,
  ) {
    await accountRepository.postAccount(
      user_id,
      content,
      amount,
      timestamp,
      category_id,
      payment_id,
    );
    return 'post account success';
  }
}
