import config from './config';
import express from 'express';
import loader from './loaders';
import controller from './controllers';
import path from 'path';

const app = express();
const PORT = config.port;

loader(app);

app.use('/api', controller());

app.use('*', express.static(path.join(__dirname, '../../client/dist')));

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
