import config from './config';
import express from 'express';
import loader from './loaders';
import controller from './controllers';
import path from 'path';
import errorHandler from './error';
async function startServer() {
  const app = express();
  const PORT = config.port;

  await loader(app);

  app.use('/api', controller());

  app.use('/', express.static(path.join(__dirname, '../../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  });
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
}

startServer();
