import { Field, InputType, Int, ObjectType } from 'type-graphql';
import { Slot } from './slot.schema';

@ObjectType()
@InputType('BookingInput')
export class Booking {
  @Field()
  doctor!: string;

  @Field()
  date!: string;

  @Field()
  patient_name!: string;

  @Field()
  patient_phone!: string;

  @Field()
  booking_id: string = '';

  @Field(type => Int)
  duration_mins: number = 0;

  @Field((type) => Slot)
  slot!: Slot;
}
