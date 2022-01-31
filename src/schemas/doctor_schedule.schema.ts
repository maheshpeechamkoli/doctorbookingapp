import { Field, InputType, ObjectType } from 'type-graphql';
import { Slot } from './slot.schema';

@ObjectType()
@InputType('DoctorScheduleInput')
export class DoctorSchedule {
  @Field()
  doctor!: string;

  @Field()
  date!: string;

  @Field(type => [Slot])
  slots!: Slot[];
}
