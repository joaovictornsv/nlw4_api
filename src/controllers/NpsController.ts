import { NpsCalcService } from '@services/NpsCalcService'
import { Request, Response } from 'express'

class NpsController {
  async execute (request: Request, response: Response) {
    const npsCalcService = new NpsCalcService()

    const nps = await npsCalcService.execute(request)

    return response.json(nps)
  }
}

export { NpsController }
