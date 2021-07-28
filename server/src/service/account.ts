import AccountRepository from '../repository/account';

const accountRepository = new AccountRepository();

export default class AccountService {
  async getAccountsByMonth(userId: string, thisMonth: Date) {
    const nextMonth = new Date(
      thisMonth.getFullYear(),
      thisMonth.getMonth() + 1,
      1,
    );
    const accounts = await accountRepository.getByMonth(
      userId,
      thisMonth,
      nextMonth,
    );
    if (!accounts.length) throw new Error('NO_DATA');
    return accounts;
  }
}
