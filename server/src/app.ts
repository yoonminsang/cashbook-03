import config from './config';
import express from 'express';
import loader from './loaders';
import controller from './controllers';
import path from 'path';
import errorHandler from './error';
async function startServer() {
  const app = express();
  const PORT = config.port;
  const STATIC = path.resolve(__dirname, '../../client/dist');
  const INDEX = path.resolve(STATIC, 'index.html');

  await loader(app);

  app.use('/api', controller());

  app.use(express.static(STATIC));
  app.get('*', (req, res) => res.sendFile(INDEX));

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
}

startServer();
