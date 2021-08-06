import { Router, Request, Response, NextFunction } from 'express';
import { ErrorStatus } from '../error';
import CategoryController from './category';
import UserController from './user';
import PaymentController from './payment';
import AccountController from './account';
import AuthController from './auth';

export default () => {
  const router = Router();

  router.use('/category', new CategoryController().configureRoutes());
  router.use('/user', new UserController().configureRoutes());
  router.use('/payment', new PaymentController().configureRoutes());
  router.use('/account', new AccountController().configureRoutes());
  router.use('/auth', new AuthController().configureRoutes());

  router.use((req: Request, res: Response, next: NextFunction) =>
    next(new ErrorStatus(404, 'Unknown Endpoint')),
  );

  return router;
};
