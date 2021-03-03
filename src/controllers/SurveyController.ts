import { Request, Response } from 'express'
import CreateSurveyService from '@services/CreateSurveyService'
import { ListSurveyService } from '@services/ListSurveyService'
import surveyView from '@views/survey_view'

class SurveyController {
  async index (request: Request, response: Response): Promise<Response> {
    const listSurveyService = new ListSurveyService()

    const surveys = await listSurveyService.execute()

    return response.status(200).json(surveyView.renderMany(surveys))
  }

  async create (request: Request, response: Response): Promise<Response> {
    const createSurveyService = new CreateSurveyService()

    const surveyCreated = await createSurveyService.execute(request.body)

    return response.status(201).json(surveyView.render(surveyCreated))
  }
}

export { SurveyController }
