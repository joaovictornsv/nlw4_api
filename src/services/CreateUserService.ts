
import { getCustomRepository } from 'typeorm';
import UserRepository from '../repositories/UserRepository';
import User from '../models/User';
import HttpException from 'src/errors/HttpException';

interface UserRequest {
  name: string;
  email: string;
}

export default class ListUsersService {
  async execute ({
    name, 
    email
  }: UserRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const userAlreadyExists = await userRepository.findOne({
      email
    })

    if (userAlreadyExists) {
      throw new HttpException('Email já cadastrado.');
    }

    const userCreated = userRepository.create({ name, email });

    await userRepository.save(userCreated);

    return userCreated;
  }
}