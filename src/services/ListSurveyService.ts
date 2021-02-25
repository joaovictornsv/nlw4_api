import Survey from "src/models/Survey";
import { SurveysRepository } from "src/repositories/SurveysRepository";
import { getCustomRepository } from "typeorm";

class ListSurveyService {
  async execute(): Promise<Survey[]> {
    const surveysRepository = getCustomRepository(SurveysRepository);

    const surveys = await surveysRepository.find();

    return surveys;
  }
}

export { ListSurveyService }
