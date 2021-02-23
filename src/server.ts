import 'reflect-metadata'
import express from 'express';
import { errors } from 'celebrate'
import router from './routes';
import './database';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(router);
app.use(errors());

app.listen(3333, () => console.log('Server is running on port 3333.'));
