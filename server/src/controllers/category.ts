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

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await categoryService.getCategories();

      if (data.length) {
        res.status(200).json({ data });
      } else {
        res.status(404).end();
      }
    } catch (error) {}
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const data = await categoryService.getCategoryById(id);

      if (data) {
        res.status(200).json({ data });
      } else {
        res.status(404).end();
      }
    } catch (error) {}
  }
}
