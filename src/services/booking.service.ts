import random from 'random';

import { Inject } from 'typescript-ioc';
import { BookingModel } from '../models/booking.model';
import { IBookingRepository } from '../repository/booking.repository.api';
import { getDateTimeFromString, getDurationMin } from '../utils/date_operations';
import { IBookingService } from './booking.service.api';
import { IDoctorScheduleRepository } from '../repository/doctor_schedule.repository.api';
import { Slot } from '../models/slot.model';
import { FreeSlotsModel } from '../models/free_slots.models';

export class BookingService implements IBookingService {
  @Inject
  bookingRepo!: IBookingRepository;
  @Inject
  doctorScheduleRepo!: IDoctorScheduleRepository;

  constructor() {}

  async addDoctorBooking(request: BookingModel) {
    request.duration_mins = getDurationMin(request.date, request.slot.start_time, request.slot.end_time);
    request.date = getDateTimeFromString(request.date);
    request.booking_id = random.int(0, 99999).toString();
    return await this.bookingRepo.insert(request);
  }

  async getAvailableFreeSlots(requestDate: string, doctorId: string, duration: number) {
    let availabilitySlots: Slot[] = [];
    // query doctor's availability record for a date
    const date = getDateTimeFromString(requestDate);
    const availability = await this.getDoctorSchedule(date, doctorId);
    if (availability) {
      availabilitySlots = availability.slots;
    }
    // query bookings for the doctor for the date - sorted
    const docBookings = await this.getDoctorBooking(date, doctorId);

    // extract array of booked slots only: [{start, end}]
    const bookedSlots = docBookings.map((item: BookingModel) => item.slot);

    availabilitySlots.sort(this.sortByTime);

    let bookableSlots: Slot[] = [];
    availabilitySlots.forEach((availability: Slot) => {
      const freeSlotsWithin = this.getFreeSlotsWithin(availability, bookedSlots);

      freeSlotsWithin.forEach((slot: any) => {
        bookableSlots = bookableSlots.concat(this.getBookableSlotsIn(slot, duration));
      });
    });

    const response: FreeSlotsModel = {
      doctor: doctorId,
      date: requestDate,
      duration: duration,
      slots: bookableSlots,
    };
    return response;
  }

  private getBookableSlotsIn(slot: any, duration: number) {
    const startHours = parseInt(slot.startTime.split(':')[0]);
    const startMinutes = parseInt(slot.startTime.split(':')[1]);
    const endHours = parseInt(slot.endTime.split(':')[0]);
    const endMinutes = parseInt(slot.endTime.split(':')[1]);

    const startTime = new Date();
    startTime.setHours(startHours, startMinutes, 0, 0);

    // start time rounding to 15 minute interval
    const startMinutesMod = (startMinutes + 15) % 15;
    const minutesToAddFor15 = startMinutesMod > 0 ? 15 - startMinutesMod : 0;
    startTime.setMinutes(startMinutes + minutesToAddFor15);

    const endTime = new Date();
    endTime.setHours(endHours, endMinutes, 0, 0);

    const minutesDiff = Math.floor((endTime.getTime() - startTime.getTime()) / 60000);
    if (minutesDiff < duration) return [];

    const slots = [];
    for (var i = 0; i <= minutesDiff; i = i + 15) {
      const s = new Date(startTime.getTime());
      s.setMinutes(startTime.getMinutes() + i);
      const e = new Date(s.getTime());
      e.setMinutes(s.getMinutes() + duration);

      if (e.getTime() <= endTime.getTime()) {
        slots.push({
          start_time: `${s.getHours()}:${s.getMinutes()}`,
          end_time: `${e.getHours()}:${e.getMinutes()}`,
        });
      }
    }

    return slots;
  }

  private getBookedSlotsWithin(docAvailabilitySlot: any, bookedSlots: Slot[]) {
    const bookedSlotsWithin = bookedSlots.filter((booked: any) => {
      return booked.start_time >= docAvailabilitySlot.start_time && booked.end_time <= docAvailabilitySlot.end_time;
    });

    bookedSlotsWithin.sort((a: any, b: any) => {
      return a.start_time.getTime() - b.start_time.getTime();
    });

    return bookedSlotsWithin;
  }

  private getFreeSlotsWithin(docAvailabilitySlot: Slot, bookedSlots: Slot[]) {
    const bookedSlotsWithin = this.getBookedSlotsWithin(docAvailabilitySlot, bookedSlots);

    const freeSlotsWithin = [];
    if (bookedSlotsWithin.length > 0) {
      for (var i = 0; i < bookedSlotsWithin.length; i++) {
        const isFirst = i == 0;
        const isLast = i == bookedSlotsWithin.length - 1;

        const booked = bookedSlotsWithin[i];
        const nextBooked = isLast ? null : bookedSlotsWithin[i + 1];

        if (isFirst) {
          freeSlotsWithin.push({ startTime: docAvailabilitySlot.start_time, endTime: booked.start_time });
        }

        if (isLast) {
          freeSlotsWithin.push({ startTime: booked.end_time, endTime: docAvailabilitySlot.end_time });
        }

        if (nextBooked) {
          freeSlotsWithin.push({ startTime: booked.end_time, endTime: nextBooked.start_time });
        }
      }
    } else {
      freeSlotsWithin.push({ startTime: docAvailabilitySlot.start_time, endTime: docAvailabilitySlot.end_time });
    }
    return freeSlotsWithin;
  }

  private sortByTime(a: Slot, b: Slot) {
    return parseInt(a.start_time.replace(':', '')) - parseInt(b.start_time.replace(':', ''));
  }

  private async getDoctorSchedule(date: Date, doctorId: string) {
    return await this.doctorScheduleRepo.getDoctorSchedule(date, doctorId);
  }

  private async getDoctorBooking(date: Date, doctorId: string) {
    return await this.bookingRepo.getDoctorBooking(date, doctorId);
  }
}
