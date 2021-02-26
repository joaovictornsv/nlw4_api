import { Request, Response } from 'express'
import { CreateSurveyUserService } from '../services/CreateSurveyUserService'

class SendMailController {
  async execute (request: Request, response: Response): Promise<Response> {
    const createSurveyUserService = new CreateSurveyUserService()

    const surveyUserCreated = await createSurveyUserService.execute(request.body)

    return response.status(201).json(surveyUserCreated)
  }
}

export { SendMailController }
