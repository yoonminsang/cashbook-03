import AccountRepository from '../repository/account';

const accountRepository = new AccountRepository();
const RECENT_MONTHS = 6;

export default class AccountService {
  async getAccounts(userId: string, filters: any) {
    if (!filters.year || !filters.month) throw new Error('NO_DATA');

    const { year, month, categoryId } = filters;
    const yearNum = parseInt(year);
    const monthIndex = parseInt(month) - 1;

    const startDate = new Date(
      yearNum,
      categoryId ? monthIndex - RECENT_MONTHS + 1 : monthIndex,
    );
    const endDate = new Date(yearNum, monthIndex + 1);

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
    return '내역이 추가되었습니다';
  }

  async deleteAccount(userId: string, accountId: string) {
    if (!accountId) throw new Error('NO_DATA');

    await accountRepository.deleteAccount(userId, accountId);
    return '내역이 삭제되었습니다';
  }
}
