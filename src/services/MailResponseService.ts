import { Request, Response } from 'express'

class MailResponseService {
  async execute (request: Request, response: Response) {
    const { value } = request.params
  }
}

export { MailResponseService }
