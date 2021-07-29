import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { ErrorStatus } from '../error';
import { isLoggedIn, isNotLoggedIn } from '../middleware/authMiddleWare';

export default class AuthController {
  configureRoutes() {
    const router = Router();

    router.get('/success', (req, res) => {
      return res.status(200).json({ message: 'oauth login success' });
    });
    router.get('/fail', (req, res) => {
      return res.status(409).json({ message: 'oauth login fail' });
    });
    router.post('/login', isNotLoggedIn, this.localLogin);
    router.get('/lotout', isLoggedIn, this.logout);
    router.get('/github', isNotLoggedIn, passport.authenticate('github'));
    router.get(
      '/github/callback',
      passport.authenticate('github', { failureRedirect: '/api/auth/fail' }),
      (req, res) => {
        res.redirect('/api/auth/success');
      },
    );
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

  async logout(req: Request, res: Response, next: NextFunction) {
    req.logout();
    req.session.destroy((err) => {
      if (err) return next(err);
      return res.status(200).json({ message: '로그아웃' });
    });
  }
}
