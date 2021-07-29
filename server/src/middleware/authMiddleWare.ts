import { Request, Response, NextFunction } from 'express';

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({ message: 'need login' });
  }
};

export const isNotLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({ message: 'not authorized' });
  }
};
