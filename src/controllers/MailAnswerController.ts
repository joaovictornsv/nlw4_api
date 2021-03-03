import { MailAnswerService } from '@services/MailAnswerService'
import { Request, Response } from 'express'

class MailAnswerController {
  async execute (request: Request, response: Response) {
    const { value } = request.params
    const { u: id } = request.query

    const mailAnswerService = new MailAnswerService()

    const surveyUserUpdated = await mailAnswerService.execute(String(id), Number(value))

    return response.json(surveyUserUpdated)
  }
}

export { MailAnswerController }
