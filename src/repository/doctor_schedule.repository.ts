import { DoctorScheduleModel } from '../models/doctor_schedule.model';
import { IDoctorScheduleRepository } from './doctor_schedule.repository.api';

const DoctorsSchedule = require('../repository/entity/doctor_schedule');

export class DoctorScheduleRespository implements IDoctorScheduleRepository {
  async insert(request: DoctorScheduleModel) {
    return await DoctorsSchedule.create(request).then((response: DoctorScheduleModel) => {
      return response;
    });
  }

  async getDoctorSchedule(date: Date, doctorId: string) {
    return await DoctorsSchedule.findOne({
      date: date,
      doctor: doctorId,
    });
  }
}
