import express from 'express';
import router from './routes';

const app = express();

app.listen(3333, () => console.log('Server is running on port 3333.'));

app.use(router);