import { Router, Request, Response, NextFunction } from 'express';
import { ErrorStatus } from '../error';
import AccountService from '../service/account';
import { isLoggedIn } from '../middleware/authMiddleWare';

const accountService = new AccountService();

export default class AccountController {
  configureRoutes() {
    const router = Router();

    router.get('/', isLoggedIn, this.get);
    router.get('/', isLoggedIn, this.post);

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

  async post(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        user: { id: user_id },
      } = req;

      const { content, amount, timestamp, category_id, payment_id } = req.body;

      const data = await accountService.postAccount(
        user_id,
        content,
        amount,
        timestamp,
        category_id,
        payment_id,
      );

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
}
