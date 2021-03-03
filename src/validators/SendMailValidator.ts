import { errorsMessages } from '@config/celebrate.config'
import { celebrate, Joi, Segments } from 'celebrate'

export default celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required().messages(errorsMessages),
    survey_id: Joi.string().uuid().required().messages(errorsMessages)
  })
})
