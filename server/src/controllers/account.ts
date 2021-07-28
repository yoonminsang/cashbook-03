import { Router, Request, Response, NextFunction } from 'express';
import { ErrorStatus } from '../error';
import AccountService from '../service/account';

const accountService = new AccountService();

export default class AccountController {
  configureRoutes() {
    const router = Router();

    router.get('/', this.get);

    return router;
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, year, month } = req.body;
      const yearMonth = new Date(year, month - 1);

      const data = await accountService.getAccountsByMonth(userId, yearMonth);

      res.status(200).json({ data });
    } catch (error) {
      if (error.message === 'NO_DATA')
        return next(new ErrorStatus(500, 'Payment not initialized'));

      next(error);
    }
  }
}
