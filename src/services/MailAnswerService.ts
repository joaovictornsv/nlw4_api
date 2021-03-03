import { SurveysUsersRepository } from '@repositories/SurveysUsersRepository'
import HttpException from '../errors/HttpException'
import { getCustomRepository } from 'typeorm'
import { SurveyUser } from '@models/SurveyUser'

class MailAnswerService {
  async execute (id: string, value: number): Promise<SurveyUser> {
    const surveysUserRepository = getCustomRepository(SurveysUsersRepository)

    const surveyUser = await surveysUserRepository.findOne({
      id: String(id)
    })

    if (!surveyUser) {
      throw new HttpException('Survey User does not exist')
    }

    surveyUser.value = Number(value)

    await surveysUserRepository.save(surveyUser)

    return surveyUser
  }
}

export { MailAnswerService }
