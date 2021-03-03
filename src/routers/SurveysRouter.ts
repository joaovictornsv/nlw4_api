import { Router } from 'express'
import { SurveyController } from '@controllers/SurveyController'
import SurveyValidator from 'src/validators/SurveyValidator'

const routes = Router()

const surveyController = new SurveyController()

routes.get('/', surveyController.index)

routes.post('/', SurveyValidator, surveyController.create)

export default routes
