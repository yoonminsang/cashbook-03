import { Router, Request, Response, NextFunction } from 'express';
import { ErrorStatus } from '../error';
import AccountService from '../service/account';
import { isLoggedIn } from '../middleware/authMiddleWare';

const accountService = new AccountService();

export default class AccountController {
  configureRoutes() {
    const router = Router();

    router.get('/', isLoggedIn, this.get);
    router.post('/', isLoggedIn, this.post);
    router.delete('/', isLoggedIn, this.delete);
    router.get('/:id', isLoggedIn, this.getById);
    router.put('/', isLoggedIn, this.update);

    return router;
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    if (!req.user?.id) return next(new ErrorStatus(403, '로그인이 필요합니다'));

    try {
      const {
        user: { id: user_id },
      } = req;
      const { id } = req.params;

      const data = await accountService.getAccountById(user_id, id);

      res.status(200).json({ data });
    } catch (error) {
      if (error.message === 'NO_YEAR')
        return next(new ErrorStatus(400, 'year is required'));

      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    if (!req.user?.id) return next(new ErrorStatus(403, '로그인이 필요합니다'));

    try {
      const {
        user: { id: user_id },
      } = req;

      const { id, content, amount, timestamp, category_id, payment_id } =
        req.body;
      const message = await accountService.updateAccount(
        id,
        content,
        amount,
        timestamp,
        category_id,
        payment_id,
      );
      res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    if (!req.user?.id) return next(new ErrorStatus(403, '로그인이 필요합니다'));

    try {
      const {
        user: { id: user_id },
      } = req;
      const { year, month, categoryId } = req.query;

      const data = await accountService.getAccounts(user_id, {
        year,
        month,
        categoryId,
      });

      res.status(200).json({ data });
    } catch (error) {
      if (error.message === 'NO_DATA')
        return next(new ErrorStatus(400, 'year, month is required'));

      next(error);
    }
  }

  async post(req: Request, res: Response, next: NextFunction) {
    if (!req.user?.id) return next(new ErrorStatus(403, '로그인이 필요합니다'));

    try {
      const {
        user: { id: user_id },
      } = req;

      const { content, amount, timestamp, category_id, payment_id } = req.body;
      const message = await accountService.postAccount(
        user_id!,
        content,
        amount,
        timestamp,
        category_id,
        payment_id,
      );
      res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    if (!req.user?.id) return next(new ErrorStatus(403, '로그인이 필요합니다'));
    try {
      const {
        user: { id: user_id },
      } = req;

      const { account_id } = req.body;

      const message = await accountService.deleteAccount(user_id!, account_id);

      res.status(200).json({ message });
    } catch (error) {
      if (error.message === 'NO_DATA')
        return next(new ErrorStatus(400, 'account id is required'));

      next(error);
    }
  }
}
