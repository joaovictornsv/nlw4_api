import { errorsMessages } from '@config/celebrate.config'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { UserController } from '@controllers/UserController'

const routes = Router()

const userController = new UserController()

routes.get('/', userController.index)

routes.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(3).required().messages(errorsMessages),
    email: Joi.string().email().required().messages(errorsMessages)
  })
}),
userController.create
)

export default routes
