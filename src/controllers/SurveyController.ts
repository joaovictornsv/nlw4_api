import { Request, Response } from "express";
import CreateSurveyService from "src/services/CreateSurveyService";
import surveyView from '../views/survey_view';

class SurveyController {
  async create(request: Request, response: Response) {
    const createSurveyService = new CreateSurveyService;

    const surveyCreated = await createSurveyService.execute(request.body);

    return response.json(surveyView.render(surveyCreated));
  }
}

export { SurveyController }
