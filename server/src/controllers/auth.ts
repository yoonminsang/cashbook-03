import config from '../config';
import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { ErrorStatus } from '../error';
import { isLoggedIn, isNotLoggedIn } from '../middleware/authMiddleWare';

export default class AuthController {
  configureRoutes() {
    const router = Router();

    router.get('/check', this.getUser);
    router.post('/login', isNotLoggedIn, this.localLogin);
    router.post('/logout', isLoggedIn, this.logout);
    router.get('/github', isNotLoggedIn, passport.authenticate('github'));
    router.get(
      '/github/callback',
      passport.authenticate('github', {
        failureRedirect: config.frontUrl + '/login',
      }),
      (req, res) => {
        res.redirect(config.frontUrl!);
      },
    );
    return router;
  }

  async getUser(req: Request, res: Response) {
    const user = req.user || null;
    return res.status(200).json({ user });
  }

  async localLogin(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('local', (authError, user, info) => {
      if (authError) return next(authError);

      if (!user)
        return next(new ErrorStatus(409, '아이디 또는 비밀번호가 틀립니다'));

      req.logIn(user, (loginError) => {
        if (loginError) return next(loginError);
        return res.status(200).json({ message: '로그인' });
      });
    })(req, res, next);
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    req.logout();
    req.session.destroy((err) => {
      if (err) return next(err);
      return res.status(200).json({ message: '로그아웃' });
    });
  }
}
