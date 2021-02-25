import Survey from 'src/models/Survey'
import { SurveysRepository } from 'src/repositories/SurveysRepository'
import { getCustomRepository } from 'typeorm'

interface SurveyRequest {
  title: string;
  description: string;
}

export default class CreateSurveyService {
  async execute ({
    title,
    description
  }: SurveyRequest): Promise<Survey> {
    const surveysRepository = getCustomRepository(SurveysRepository)

    const surveyCreated = surveysRepository.create({ title, description })

    await surveysRepository.save(surveyCreated)

    return surveyCreated
  }
}
