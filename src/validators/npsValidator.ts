import { errorsMessages } from '@config/celebrate.config'
import { celebrate, Joi, Segments } from 'celebrate'

export default celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    survey_id: Joi.string().uuid().required().messages(errorsMessages)
  })
})
