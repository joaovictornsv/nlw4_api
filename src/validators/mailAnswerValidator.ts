import { errorsMessages } from '@config/celebrate.config'
import { celebrate, Joi, Segments } from 'celebrate'

export default celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    value: Joi.number().required().min(0).max(10)
  }),
  [Segments.QUERY]: Joi.object().keys({
    u: Joi.string().uuid().required().messages(errorsMessages)
  })
})
