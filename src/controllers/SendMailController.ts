import { Request, Response } from 'express'
import { CreateSurveyUserService } from '../services/CreateSurveyUserService'
import SendMailService from '../services/SendEmailService'

interface RequestBody extends Request {
  body: {
    email: string,
    survey_id: string
  }
}

class SendMailController {
  async execute (request: RequestBody, response: Response): Promise<Response> {
    const { email, survey_id } = request.body

    const createSurveyUserService = new CreateSurveyUserService()

    const { surveyUser, surveyTitle, surveyDescription } = await createSurveyUserService.execute({ email, survey_id })

    await SendMailService.execute(email, surveyTitle, surveyDescription)

    return response.status(201).json(surveyUser)
  }
}

export { SendMailController }
