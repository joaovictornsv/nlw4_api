import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Users } from '../models/User';

export default {

  async index(request: Request, response: Response): Promise<Response> {
    const userRepository = getRepository(Users);

    const users = await userRepository.find();

    return response.json(users);
  }

}