import { DoctorScheduleModel } from "../models/doctor_schedule.model";

export abstract class IDoctorScheduleRepository {
  abstract insert(request: DoctorScheduleModel): Promise<DoctorScheduleModel>;
  abstract getDoctorSchedule(date: Date, doctorId: string): Promise<DoctorScheduleModel>;
}
