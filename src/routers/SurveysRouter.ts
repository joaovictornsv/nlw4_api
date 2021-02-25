import { errorsMessages } from '@config/celebrate.config'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { SurveyController } from 'src/controllers/SurveyController'

const routes = Router()

const surveyController = new SurveyController()

routes.get('/', surveyController.index)

routes.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().min(3).required().messages(errorsMessages),
    description: Joi.string().required().messages(errorsMessages)
  })
}),
surveyController.create
)

export default routes
