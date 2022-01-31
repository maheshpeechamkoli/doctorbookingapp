import { UserModel } from '../models/user.model';
import { IUserRepository } from './user.repository.api';

const Users = require('../repository/entity/users');

export class UserRespository implements IUserRepository {
  async insert(request: UserModel) {
    return await Users.create(request).then((response: UserModel) => {
      return response;
    });
  }
}
