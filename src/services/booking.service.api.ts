import { BookingModel } from '../models/booking.model';
import { FreeSlotsModel } from '../models/free_slots.models';

export abstract class IBookingService {
  abstract addDoctorBooking(request: BookingModel): Promise<BookingModel>;
  abstract getAvailableFreeSlots(date: string, doctorId: string, duration: number): Promise<FreeSlotsModel>;
}
