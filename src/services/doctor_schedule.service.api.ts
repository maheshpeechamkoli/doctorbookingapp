import { DoctorScheduleModel } from '../models/doctor_schedule.model';

export abstract class IDoctorScheduleService {
  abstract addDoctorSchedule(request: DoctorScheduleModel): Promise<DoctorScheduleModel>;
}
