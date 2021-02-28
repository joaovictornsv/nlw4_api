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
  userName: string,
  surveyTitle: string,
  surveyDescription: string
}

class CreateSurveyUserService {
  async execute ({ email, survey_id }: MailBodyRequest): Promise<SurveyUserDataProps> {
    const userRepository = getCustomRepository(UserRepository)
    const surveysRepository = getCustomRepository(SurveysRepository)
    const surveysUserRepository = getCustomRepository(SurveysUsersRepository)

    const user = await userRepository.findOne({ email })

    if (!user) {
      throw new HttpException('User does not exists')
    }

    const survey = await surveysRepository.findOne({ id: survey_id })

    if (!survey) {
      throw new HttpException('Survey does not exists')
    }

    const surveyUserCreated = await surveysUserRepository.create({
      user_id: user.id,
      survey_id
    })

    await surveysUserRepository.save(surveyUserCreated)

    const SurveyUserData = {
      surveyUser: surveyUserCreated,
      userName: user.name,
      surveyTitle: survey.title,
      surveyDescription: survey.description
    }

    return SurveyUserData
  }
}
export { CreateSurveyUserService }
