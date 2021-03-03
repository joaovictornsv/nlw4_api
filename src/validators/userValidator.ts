import { errorsMessages } from '@config/celebrate.config'
import { celebrate, Joi, Segments } from 'celebrate'

export default celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(3).required().messages(errorsMessages),
    email: Joi.string().email().required().messages(errorsMessages)
  })
})
