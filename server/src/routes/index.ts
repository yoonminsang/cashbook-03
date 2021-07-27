import express, { Router } from 'express';
import path from 'path';
import apiRoutes from '../controllers';

export default () => {
  const router = Router();

  router.use('/', express.static(path.join(__dirname, '../../../client/dist')));

  router.use('/api', apiRoutes());

  return router;
};
