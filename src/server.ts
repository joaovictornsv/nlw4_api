import 'reflect-metadata'
import express from 'express';
import router from './routes';
import './database';

const app = express();

app.listen(3333, () => console.log('Server is running on port 3333.'));

app.use(router);