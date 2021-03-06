import { getCustomRepository } from 'typeorm'
import { UserRepository } from '@repositories/UserRepository'
import User from '@models/User'

export default class ListUsersService {
  async execute (): Promise<User[]> {
    const userRepository = getCustomRepository(UserRepository)

    const users = await userRepository.find()

    return users
  }
}
