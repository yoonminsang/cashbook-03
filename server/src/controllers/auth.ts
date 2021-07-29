import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { ErrorStatus } from '../error';
import UserService from '../service/user';

export default class AuthController {
  configureRoutes() {
    const router = Router();

    router.post('/login', this.localLogin);
    router.get('/lotout');
    return router;
  }

  async localLogin(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('local', (authError, user, info) => {
      if (authError) return next(authError);
      if (!user)
        return next(
          new ErrorStatus(409, 'The username or password do not match'),
        );
      req.logIn(user, (loginError) => {
        if (loginError) return next(loginError);
        return res.redirect('/api/auth');
      });
    })(req, res, next);
  }

  async githubLogin(req: Request, res: Response, next: NextFunction) {}

  async logout(req: Request, res: Response, next: NextFunction) {
    req.logout();
    req.session.destroy((err) => {
      if (err) return next(err);
      return res.status(200).json({ message: '로그아웃' });
    });
  }
}
