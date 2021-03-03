import { SurveysUsersRepository } from '@repositories/SurveysUsersRepository'
import HttpException from '../errors/HttpException'
import { getCustomRepository, MoreThanOrEqual } from 'typeorm'
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

    const surveyUserHasBeenAnswered = await surveysUserRepository.findOne({
      where: { id: String(id), value: MoreThanOrEqual(0) }
    })

    if (surveyUserHasBeenAnswered) {
      throw new HttpException('This survey has been answered')
    }

    surveyUser.value = Number(value)

    await surveysUserRepository.save(surveyUser)

    return surveyUser
  }
}

export { MailAnswerService }
