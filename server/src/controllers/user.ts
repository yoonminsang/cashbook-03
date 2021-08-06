import { Router, Request, Response, NextFunction } from 'express';
import { ErrorStatus } from '../error';
import UserService from '../service/user';
import { isNotLoggedIn } from '../middleware/authMiddleWare';

const userService = new UserService();

export default class UserController {
  configureRoutes() {
    const router = Router();

    router.get('/:id', this.getById);
    router.post('/signup', isNotLoggedIn, this.signup);
    return router;
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await userService.getUserById(id);

      res.status(200).json({ data });
    } catch (error) {
      if (error.message === 'NO_DATA')
        return next(new ErrorStatus(404, 'Unknown User ID'));

      next(error);
    }
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, nickname } = req.body;
      const message = await userService.signUp(email, password, nickname);

      res.status(200).json({ message });
    } catch (error) {
      if (error.message === 'EMAIL_DUPLICATE')
        return next(new ErrorStatus(409, '존재하는 이메일입니다'));

      if (error.message === 'PAYMENT_INIT_FAIL')
        return next(
          new ErrorStatus(
            500,
            '문제가 발생하여 결제수단 초기화에 실패했습니다',
          ),
        );

      next(error);
    }
  }
}
