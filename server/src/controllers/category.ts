import { Router, Request, Response, NextFunction } from 'express';
import CategoryService from '../service/category-service';

const categoryService = new CategoryService();

export default class CategoryController {
  configureRoutes() {
    const router = Router();

    router.get('/', this.get);

    return router;
  }

  get(req: Request, res: Response, next: NextFunction) {
    categoryService.getCategories().then((data) => {
      res.send(data);
    });
  }
}
