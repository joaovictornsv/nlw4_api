import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import Users from '../models/User';
import usersView from '../views/user_view';

export default {

  async index(request: Request, response: Response): Promise<any> {
    const userRepository = getRepository(Users);

    const users = await userRepository.find();

    return response.json(usersView.renderMany(users));
  },

  async create(request: Request, response: Response): Promise<Response> {
    const userRepository = getRepository(Users);

    const { name, email } = request.body;

    const userCreated = userRepository.create({ name, email });

    await userRepository.save(userCreated);

    return response.status(201).json(usersView.render(userCreated));

  }
}