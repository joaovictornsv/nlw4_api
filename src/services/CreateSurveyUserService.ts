import HttpException from '../errors/HttpException'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from '@repositories/UserRepository'
import { SurveysUsersRepository } from '@repositories/SurveysUsersRepository'
import { SurveyUser } from '@models/SurveyUser'

interface MailBodyRequest {
  email: string;
  survey_id: string;
}

class CreateSurveyUserService {
  async execute ({ email, survey_id }: MailBodyRequest): Promise<SurveyUser> {
    const userRepository = getCustomRepository(UserRepository)
    const surveysUserRepository = getCustomRepository(SurveysUsersRepository)

    const user = await userRepository.findOne({ email })

    if (!user) {
      throw new HttpException('User does not exists')
    }

    const surveyUserCreated = surveysUserRepository.create({
      user_id: user.id,
      survey_id
    })

    await surveysUserRepository.save(surveyUserCreated)

    return surveyUserCreated
  }
}
export { CreateSurveyUserService }
