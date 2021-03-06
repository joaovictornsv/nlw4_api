import { Request, Response } from 'express'
import { CreateSurveyUserService } from '@services/CreateSurveyUserService'
import SendMailService from '@services/SendMailService'
import { resolve } from 'path'
import { SurveysUsersRepository } from '@repositories/SurveysUsersRepository'
import { getCustomRepository, IsNull, Not } from 'typeorm'
import { UserRepository } from '@repositories/UserRepository'
import HttpException from '../errors/HttpException'
import { SurveysRepository } from '@repositories/SurveysRepository'

interface RequestBody extends Request {
  body: {
    email: string,
    survey_id: string
  }
}

class SendMailController {
  async execute (request: RequestBody, response: Response): Promise<Response> {
    const surveyUserRepository = getCustomRepository(SurveysUsersRepository)
    const userRepository = getCustomRepository(UserRepository)
    const surveysRepository = getCustomRepository(SurveysRepository)

    const { email, survey_id } = request.body

    //
    // Check if user and survey exists
    const user = await userRepository.findOne({ email })
    if (!user) {
      throw new HttpException('User does not exists')
    }

    const survey = await surveysRepository.findOne({ id: survey_id })
    if (!survey) {
      throw new HttpException('Survey does not exists')
    }

    //
    // Check if the user and the search are related
    const surveyUserAlreadyExists = await surveyUserRepository.findOne({
      where: { user_id: user.id, survey_id: survey.id, value: null },
      relations: ['user', 'survey']
    })

    const surveyHasBeenAnswered = await surveyUserRepository.findOne({
      where: { user_id: user.id, survey_id: survey.id, value: Not(IsNull()) }
    })

    //
    // Variables to send mail
    const link = process.env.URL_MAIL || 'http://localhost:3333/answers'

    const mailVariables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      link,
      id: ''
    }

    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs')

    if (surveyHasBeenAnswered) {
      throw new HttpException('This survey has been answered')
    }

    //
    // If the user and the search are related, an email will be sent with the last searchy
    if (surveyUserAlreadyExists) {
      mailVariables.id = surveyUserAlreadyExists.id
      await SendMailService.execute(email, survey.title, mailVariables, npsPath)
      return response.json(surveyUserAlreadyExists)
    }

    //
    // If the user and the search are not related, a new relationship will be create  between them.
    const createSurveyUserService = new CreateSurveyUserService()

    const surveyUser = await createSurveyUserService.execute({ email, survey_id })

    mailVariables.id = surveyUser.id
    await SendMailService.execute(email, survey.title, mailVariables, npsPath)

    return response.status(201).json(surveyUser)
  }
}

export { SendMailController }
