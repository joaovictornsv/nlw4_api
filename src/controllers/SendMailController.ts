import { Request, Response } from 'express'
import { CreateSurveyUserService } from '../services/CreateSurveyUserService'
import SendMailService from '../services/SendEmailService'
import { resolve } from 'path'

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

    const {
      surveyUser,
      userName: name,
      surveyTitle: title,
      surveyDescription: description
    } = await createSurveyUserService.execute({ email, survey_id })

    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs')

    const mailVariables = {
      name,
      title,
      description
    }

    await SendMailService.execute(email, title, mailVariables, npsPath)

    return response.status(201).json(surveyUser)
  }
}

export { SendMailController }
