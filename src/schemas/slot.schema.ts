import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
@InputType('SlotInput')
export class Slot {
  @Field()
  start_time!: string;

  @Field()
  end_time!: string;
}
