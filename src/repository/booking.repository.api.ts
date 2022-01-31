import { BookingModel } from "../models/booking.model";

export abstract class IBookingRepository {
  abstract insert(request: BookingModel): Promise<BookingModel>;
  abstract getDoctorBooking(date: Date, doctorId: string): Promise<BookingModel[]>;
  
}
