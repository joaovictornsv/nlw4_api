import { Router } from 'express'
import { SendMailController } from '@controllers/SendMailController'
import { MailAnswerController } from '@controllers/MailAnswerController'
import { NpsController } from '@controllers/NpsController'

const routes = Router()

const mailAnswerController = new MailAnswerController()
const sendMailController = new SendMailController()
const npsController = new NpsController()

routes.get('/answers/:value', mailAnswerController.execute)
routes.get('/nps/:survey_id', npsController.execute)
routes.post('/send', sendMailController.execute)

export default routes
