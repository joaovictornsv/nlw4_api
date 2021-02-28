import { Router } from 'express'
import { MailResponseService } from 'src/services/MailResponseService'

const routes = Router()

const mailResponseService = new MailResponseService()

routes.get('/answers/:value', mailResponseService.execute)
