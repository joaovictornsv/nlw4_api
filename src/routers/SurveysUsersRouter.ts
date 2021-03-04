import { Router } from 'express'
import { SendMailController } from '@controllers/SendMailController'
import { MailAnswerController } from '@controllers/MailAnswerController'
import { NpsController } from '@controllers/NpsController'
import sendMailValidator from '../validators/sendMailValidator'
import mailAnswerValidator from '../validators/mailAnswerValidator'
import npsValidator from '../validators/npsValidator'

const routes = Router()

const mailAnswerController = new MailAnswerController()
const sendMailController = new SendMailController()
const npsController = new NpsController()

routes.get('/answers/:value', mailAnswerValidator, mailAnswerController.execute)
routes.get('/nps/:survey_id', npsValidator, npsController.execute)
routes.post('/send', sendMailValidator, sendMailController.execute)

export default routes
