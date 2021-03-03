import { Router } from 'express'
import { SendMailController } from '@controllers/SendMailController'

const routes = Router()

const sendMailController = new SendMailController()

routes.post('/', sendMailController.execute)

export default routes
