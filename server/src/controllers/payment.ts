import { Router, Request, Response, NextFunction } from 'express';
import { ErrorStatus } from '../error';
import PaymentService from '../service/payment';
import { isLoggedIn } from '../middleware/authMiddleWare';

const paymentService = new PaymentService();

export default class PaymentController {
  configureRoutes() {
    const router = Router();

    router.get('/', isLoggedIn, this.get);
    router.post('/', isLoggedIn, this.post);

    return router;
  }

  async get(req: any, res: Response, next: NextFunction) {
    try {
      const {
        user: { id: userId },
      } = req;
      const data = await paymentService.getPayments(userId);

      res.status(200).json({ data });
    } catch (error) {
      if (error.message === 'NO_DATA')
        return next(new ErrorStatus(500, 'Payment not initialized'));

      next(error);
    }
  }

  async post(req: any, res: Response, next: NextFunction) {
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

      next(error);
    }
  }
}
