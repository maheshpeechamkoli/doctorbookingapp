import { Inject } from 'typescript-ioc';
import { DoctorScheduleModel } from '../models/doctor_schedule.model';
import { IDoctorScheduleRepository } from '../repository/doctor_schedule.repository.api';
import { getDateTimeFromString } from '../utils/date_operations';
import { IDoctorScheduleService } from './doctor_schedule.service.api';

export class DoctorScheduleService implements IDoctorScheduleService {
  @Inject
    doctorScheduleRepo!: IDoctorScheduleRepository;

  constructor() {}

  async addDoctorSchedule(request: DoctorScheduleModel) {
    request.date = getDateTimeFromString(request.date);
    return await this.doctorScheduleRepo.insert(request);
  }
}
