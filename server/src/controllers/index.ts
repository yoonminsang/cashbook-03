import { Router } from 'express';

export default () => {
  const router = Router();

  router.use('/', (req, res) => {
    res.send('API');
  });

  return router;
};
