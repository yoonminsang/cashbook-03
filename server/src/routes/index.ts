import express, { Router } from 'express';
import path from 'path';

export default () => {
  const router = Router();

  router.use('/', express.static(path.join(__dirname, '../../../client/dist')));

  return router;
};
