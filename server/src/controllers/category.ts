import { Router, Request, Response, NextFunction } from 'express';
import { ErrorStatus } from '../error';
import CategoryService from '../service/category';

const categoryService = new CategoryService();

export default class CategoryController {
  configureRoutes() {
    const router = Router();

    router.get('/', this.get);
    router.get('/:id', this.getById);

    return router;
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await categoryService.getCategories();
      res.status(200).json({ data });
    } catch (error) {
      if (error.message === 'NO_DATA')
        return next(new ErrorStatus(500, 'Category not initialized'));

      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const data = await categoryService.getCategoryById(id);

      res.status(200).json({ data });
    } catch (error) {
      if (error.message === 'NO_DATA')
        next(new ErrorStatus(404, 'Unknown category ID'));

      next(error);
    }
  }
}
