import { Request, Response } from 'express'
import usersView from '../views/user_view'
import ListUserService from '../services/ListUserService'
import CreateUserService from '../services/CreateUserService'

class UserController {
  async index (request: Request, response: Response): Promise<any> {
    const listUserService = new ListUserService()

    const users = await listUserService.execute()

    return response.json(usersView.renderMany(users))
  }

  async create (request: Request, response: Response): Promise<Response> {
    const createUserService = new CreateUserService()

    const userCreated = await createUserService.execute(request.body)

    return response.status(201).json(usersView.render(userCreated))
  }
}

export { UserController }
