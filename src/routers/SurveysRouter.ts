import { Router } from 'express'
import { SurveyController } from '@controllers/SurveyController'
import surveyValidator from 'src/validators/surveyValidator'

const routes = Router()

const surveyController = new SurveyController()

routes.get('/', surveyController.index)

routes.post('/', surveyValidator, surveyController.create)

export default routes
