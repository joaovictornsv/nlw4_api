import express from 'express';
import UserController from './controllers/UserController'

const router = express.Router();

router.get('/', UserController.index);

export default router;