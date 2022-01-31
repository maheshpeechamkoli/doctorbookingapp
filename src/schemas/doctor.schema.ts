import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
@InputType('DoctorInput')
export class Doctor {
  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  phone!: string;

  @Field()
  department!: string;
}
