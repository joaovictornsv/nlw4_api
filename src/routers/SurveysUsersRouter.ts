import { Router } from 'express'
import { SendMailController } from '@controllers/SendMailController'
import { MailAnswerController } from '@controllers/MailAnswerController'

const routes = Router()

const mailAnswerController = new MailAnswerController()
const sendMailController = new SendMailController()

routes.get('/answers/:value', mailAnswerController.execute)
routes.post('/send', sendMailController.execute)

export default routes
