import { UserModel } from '../models/user.model';

export abstract class IUserService {
  abstract addUser(request: UserModel): Promise<UserModel>;
}
