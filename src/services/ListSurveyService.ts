import Survey from '@models/Survey'
import { SurveysRepository } from '@repositories/SurveysRepository'
import { getCustomRepository } from 'typeorm'

class ListSurveyService {
  async execute (): Promise<Survey[]> {
    const surveysRepository = getCustomRepository(SurveysRepository)

    const surveys = await surveysRepository.find()

    return surveys
  }
}

export { ListSurveyService }
