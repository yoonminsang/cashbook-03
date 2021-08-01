import { Router, Request, Response, NextFunction } from 'express';
import { ErrorStatus } from '../error';
import PaymentService, { MIN_PAYMENT_NUM } from '../service/payment';
import { isLoggedIn } from '../middleware/authMiddleWare';

const paymentService = new PaymentService();

export default class PaymentController {
  configureRoutes() {
    const router = Router();

    router.get('/', isLoggedIn, this.get);
    router.post('/', isLoggedIn, this.post);
    router.delete('/', isLoggedIn, this.delete);

    return router;
  }

  async get(req: Request, res: Response, next: NextFunction) {
    if (!req.user?.id) return next(new ErrorStatus(403, '로그인이 필요합니다'));
    try {
      const {
        user: { id: userId },
      } = req;
      const data = await paymentService.getPaymentNames(userId);

      res.status(200).json({ data });
    } catch (error) {
      if (error.message === 'NO_DATA')
        return next(new ErrorStatus(500, 'Payment not initialized'));

      next(error);
    }
  }

  async post(req: Request, res: Response, next: NextFunction) {
    if (!req.user?.id) return next(new ErrorStatus(403, '로그인이 필요합니다'));
    try {
      const {
        user: { id: userId },
      } = req;
      const { name } = req.body;

      const message = await paymentService.addPayment(userId, name);

      res.status(200).json({ message });
    } catch (error) {
      if (error.message === 'NO_DATA')
        return next(new ErrorStatus(400, 'name is required'));

      if (error.message === 'DUPLICATE')
        return next(new ErrorStatus(409, 'name already exists'));

      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    if (!req.user?.id) return next(new ErrorStatus(403, '로그인이 필요합니다'));
    try {
      const {
        user: { id: userId },
      } = req;
      const { id: paymentId } = req.body;
      const message = await paymentService.deletePayment(
        userId,
        parseInt(paymentId),
      );

      res.status(200).json({ message });
    } catch (error) {
      if (error.message === 'NO_DATA')
        return next(new ErrorStatus(400, 'payment id is required'));

      if (error.message === 'MIN_PAYMENT_NUM')
        return next(
          new ErrorStatus(
            400,
            `user should have at least ${MIN_PAYMENT_NUM} payment method`,
          ),
        );

      if (error.message === 'NOT_FOUND')
        return next(new ErrorStatus(400, 'payment id not found'));

      next(error);
    }
  }
}
