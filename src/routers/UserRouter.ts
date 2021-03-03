import { Router } from 'express'
import { UserController } from '@controllers/UserController'
import UserValidator from 'src/validators/UserValidator'

const routes = Router()

const userController = new UserController()

routes.get('/', userController.index)

routes.post('/', UserValidator, userController.create)

export default routes
