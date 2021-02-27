import HttpException from '../errors/HttpException'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../repositories/UserRepository'
import { SurveysRepository } from '../repositories/SurveysRepository'
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'
import { SurveyUser } from '../models/SurveyUser'

interface MailBodyRequest {
  email: string;
  survey_id: string;
}

interface SurveyUserDataProps {
  surveyUser: SurveyUser,
  surveyTitle: string,
  surveyDescription: string
}

class CreateSurveyUserService {
  async execute ({ email, survey_id }: MailBodyRequest): Promise<SurveyUserDataProps> {
    const userRepository = getCustomRepository(UserRepository)
    const surveysRepository = getCustomRepository(SurveysRepository)
    const surveysUserRepository = getCustomRepository(SurveysUsersRepository)

    const userAlreadyExists = await userRepository.findOne({ email })

    if (!userAlreadyExists) {
      throw new HttpException('User does not exists')
    }

    const surveyAlreadyExists = await surveysRepository.findOne({ id: survey_id })

    if (!surveyAlreadyExists) {
      throw new HttpException('Survey does not exists')
    }

    const surveyUserCreated = await surveysUserRepository.create({
      user_id: userAlreadyExists.id,
      survey_id
    })

    await surveysUserRepository.save(surveyUserCreated)

    const SurveyUserData = {
      surveyUser: surveyUserCreated,
      surveyTitle: surveyAlreadyExists.title,
      surveyDescription: surveyAlreadyExists.description
    }

    return SurveyUserData
  }
}
export { CreateSurveyUserService }
