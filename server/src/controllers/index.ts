import { Router } from 'express';
import CategoryController from './category';

export default () => {
  const router = Router();

  router.use('/category', new CategoryController().configureRoutes());

  return router;
};
