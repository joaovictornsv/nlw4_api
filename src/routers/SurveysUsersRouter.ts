import { Router } from 'express'
import { SendMailController } from '@controllers/SendMailController'
import { MailAnswerController } from '@controllers/MailAnswerController'
import { NpsController } from '@controllers/NpsController'
import sendMailValidator from 'src/validators/sendMailValidator'
import mailAnswerValidator from 'src/validators/mailAnswerValidator'
import npsValidator from 'src/validators/npsValidator'

const routes = Router()

const mailAnswerController = new MailAnswerController()
const sendMailController = new SendMailController()
const npsController = new NpsController()

routes.put('/answers/:value', mailAnswerValidator, mailAnswerController.execute)
routes.get('/nps/:survey_id', npsValidator, npsController.execute)
routes.post('/send', sendMailValidator, sendMailController.execute)

export default routes
