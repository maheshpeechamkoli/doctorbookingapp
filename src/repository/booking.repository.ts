import { BookingModel } from '../models/booking.model';
import { IBookingRepository } from './booking.repository.api';

const Booking = require('../repository/entity/booking');

export class BookingRespository implements IBookingRepository {
  async insert(request: BookingModel) {
    return await Booking.create(request).then((response: BookingModel) => {
      return response;
    });
  }

  async getDoctorBooking(date: Date, doctorId: string) {
    return await Booking.find({
      date: date,
      doctor: doctorId,
    });
  }
}
