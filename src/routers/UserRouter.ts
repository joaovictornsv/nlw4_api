import { Router } from 'express'
import { UserController } from '@controllers/UserController'
import userValidator from 'src/validators/userValidator'

const routes = Router()

const userController = new UserController()

routes.get('/', userController.index)

routes.post('/', userValidator, userController.create)

export default routes
