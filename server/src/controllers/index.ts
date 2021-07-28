import { Router, Request, Response, NextFunction } from 'express';
import { ErrorStatus } from '../error';
import CategoryController from './category';

export default () => {
  const router = Router();

  router.use('/category', new CategoryController().configureRoutes());

  router.use((req: Request, res: Response, next: NextFunction) =>
    next(new ErrorStatus(404, 'Unknown Endpoint')),
  );

  return router;
};
