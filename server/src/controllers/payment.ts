import { Router, Request, Response, NextFunction } from 'express';
import { ErrorStatus } from '../error';
import PaymentService from '../service/payment';

const paymentService = new PaymentService();

export default class PaymentController {
  configureRoutes() {
    const router = Router();

    router.get('/', this.get);

    return router;
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.body.userId;
      const data = await paymentService.getPayments(userId);

      res.status(200).json({ data });
    } catch (error) {
      if (error.message === 'NO_DATA')
        return next(new ErrorStatus(500, 'Payment not initialized'));

      next(error);
    }
  }
}
