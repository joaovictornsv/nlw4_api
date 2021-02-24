import Survey from "src/models/Survey";
import SurveyRepository from "src/repositories/SurveyRepository";
import { getCustomRepository } from "typeorm";

interface SurveyRequest {
  title: string;
  description: string;
}

export default class CreateSurveyService {
  async execute({
    title,
    description
  }: SurveyRequest): Promise<Survey> {
    const surveyRepository = getCustomRepository(SurveyRepository);

    const surveyCreated = surveyRepository.create({ title, description });

    await surveyRepository.save(surveyCreated);

    return surveyCreated;
  }
}
