import { Inject } from 'typescript-ioc';
import { Arg, Mutation, Query, Resolver, Root } from 'type-graphql';
import * as jwt from 'jsonwebtoken';
import { resolverManager } from './_resolver-manager';
import { User } from '../schemas/user.schema';
import { IUserService } from '../services/user.service.api';

@Resolver((of) => User)
export class UserResolver {
  @Inject
  userService!: IUserService;

  @Query((returns) => String, { nullable: true })
  async token(@Arg('email') email: string): Promise<string | undefined> {
    return jwt.sign({ data: email }, <string>process.env.AUTH_ENCRYPTION_SALT);
  }

  @Mutation((returns) => User)
  async addUser(@Arg("user")  user: User): Promise<User> {
    return this.userService.addUser(user);
  }
}

resolverManager.registerResolver(UserResolver);
