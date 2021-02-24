import express from 'express';
import UserController from './controllers/UserController'
import { celebrate, Joi, Segments, errors } from 'celebrate';
import { errorsMessages } from '@config/celebrate.config';

const router = express.Router();
router.get('/users', UserController.index);
router.post('/users',celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(3).required().messages(errorsMessages),
    email: Joi.string().email().required().messages(errorsMessages)
  })
}), UserController.create);

export default router;