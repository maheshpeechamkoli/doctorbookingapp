import { Inject } from 'typescript-ioc';
import { UserModel } from '../models/user.model';
import { IUserRepository } from '../repository/user.repository.api';
import { IUserService } from './user.service.api';

export class UserService implements IUserService {
  @Inject
    userRepo!: IUserRepository;

  constructor() {}

  async addUser(request: UserModel) {
    return await this.userRepo.insert(request);
  }
}
