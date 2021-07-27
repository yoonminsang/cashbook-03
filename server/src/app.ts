import config from './config';
import express from 'express';
import loader from './loaders';
import routes from './routes';

const app = express();
const PORT = config.port;

loader(app);

app.use('/', routes());

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
