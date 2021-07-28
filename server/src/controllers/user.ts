import { Router, Request, Response, NextFunction } from 'express';
import { ErrorStatus } from '../error';
import UserService from '../service/user';

const userService = new UserService();

export default class UserController {
  configureRoutes() {
    const router = Router();

    router.get('/:id', this.getById);

    return router;
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await userService.getUserById(id);

      res.status(200).json({ data });
    } catch (error) {
      if (error.message === 'NO_DATA')
        return next(new ErrorStatus(404, 'Unknown User ID'));

      next(error);
    }
  }
}
