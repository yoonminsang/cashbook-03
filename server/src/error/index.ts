import { Request, Response, NextFunction } from 'express';

export class ErrorStatus extends Error {
  status: number;

  constructor(status: number, message?: string) {
    super(message);
    this.status = status;
  }
}

export default (
  err: ErrorStatus | Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);

  if (err instanceof ErrorStatus) {
    res.status(err.status).end();
  }

  if (err instanceof Error) {
    res.status(500).end();
  }
};
