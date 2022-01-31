import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
@InputType('UserInput')
export class User {
  @Field()
  name!: string;

  @Field()
  email!: string;
}
