import { Router, Request, Response, NextFunction } from 'express';
import CategoryService from '../service/category';

const categoryService = new CategoryService();

export default class CategoryController {
  configureRoutes() {
    const router = Router();

    router.get('/', this.get);
    router.get('/:id', this.getById);

    return router;
  }

  get(req: Request, res: Response, next: NextFunction) {
    categoryService.getCategories().then((data) => {
      res.status(200).json({ data });
    });
  }

  getById(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    categoryService.getCategoryById(id).then((data) => {
      res.status(200).json({ data });
    });
  }
}
