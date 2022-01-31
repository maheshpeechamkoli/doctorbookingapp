import { UserModel } from '../models/user.model';

export abstract class IUserRepository {
  abstract insert(request: UserModel): Promise<UserModel>;
}
