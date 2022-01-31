import { Inject } from 'typescript-ioc';
import { Arg, Mutation, Query, Resolver, Root } from 'type-graphql';
import { resolverManager } from './_resolver-manager';
import { Booking } from '../schemas/booking.schema';
import { IBookingService } from '../services/booking.service.api';
import { FreeSlots } from '../schemas/free_slot.schema';

@Resolver((of) => Booking)
export class BookingResolver {
  @Inject
  bookingService!: IBookingService;

  @Mutation((returns) => Booking)
  async addDoctorBooking(@Arg('booking') booking: Booking): Promise<Booking> {
    return this.bookingService.addDoctorBooking(booking);
  }

  @Query((returns) => FreeSlots)
  async getAvailableFreeSlots(
    @Arg('date') date: string,
    @Arg('doctor_id') doctor_id: string,
    @Arg('duration') duration: number
  ): Promise<FreeSlots> {
    return this.bookingService.getAvailableFreeSlots(date, doctor_id, duration);
  }
}

resolverManager.registerResolver(BookingResolver);
