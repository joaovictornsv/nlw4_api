import express from 'express';
import UserController from './controllers/UserController'
import { celebrate, Joi, Segments } from 'celebrate';
import { errors } from '../src/config/celebrate.config';

const router = express.Router();

router.get('/users', UserController.index);
router.post('/users',celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(3).required().messages(errors),
    email: Joi.string().email().required().messages(errors)
  })
}), UserController.create);

export default router;