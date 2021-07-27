import config from './config';
import express from 'express';
import loader from './loaders';

const app = express();
const PORT = config.port;

loader(app);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
