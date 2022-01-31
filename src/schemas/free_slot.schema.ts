import { Field, ObjectType } from 'type-graphql';
import { Slot } from './slot.schema';

@ObjectType()
export class FreeSlots {
  @Field()
  doctor!: string;

  @Field()
  date!: string;

  @Field()
  duration!: number;

  @Field(type => [Slot])
  slots!: Slot[];
}
