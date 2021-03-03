import { errorsMessages } from '@config/celebrate.config'
import { Segments, Joi, celebrate } from 'celebrate'

export default celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().min(3).required().messages(errorsMessages),
    description: Joi.string().required().messages(errorsMessages)
  })
})
