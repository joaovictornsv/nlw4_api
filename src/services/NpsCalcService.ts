import { SurveysUsersRepository } from '@repositories/SurveysUsersRepository'
import { Request, Response } from 'express'
import { getCustomRepository, IsNull, Not } from 'typeorm'

class NpsCalcService {
  async execute (request: Request, response?: Response) {
    const { survey_id } = request.params

    const surveysUserRepository = getCustomRepository(SurveysUsersRepository)

    const surveysUsers = await surveysUserRepository.find({
      survey_id, value: Not(IsNull())
    })

    const promoters = surveysUsers.filter(
      (survey) => survey.value === 9 || survey.value === 10
    ).length

    const detractors = surveysUsers.filter(
      (survey) => survey.value >= 0 && survey.value <= 6
    ).length

    const passives = surveysUsers.filter(
      (survey) => survey.value === 7 || survey.value === 8
    ).length

    const totalAnswers = surveysUsers.length

    const score = Number(((promoters - detractors) / totalAnswers * 100).toFixed(2))

    const statusMessages = {
      excellent: 'Excellent',
      great: 'Great',
      reasonable: 'Reasonable',
      bad: 'Bad'
    }

    let status = ''

    if (score < 0) { status = statusMessages.bad } else
    if (score < 50) { status = statusMessages.reasonable } else
    if (score < 75) { status = statusMessages.great } else
    if (score <= 100) { status = statusMessages.excellent }

    return {
      nps: score,
      status,
      totalAnswers,
      promoters,
      passives,
      detractors
    }
  }
}

export { NpsCalcService }
