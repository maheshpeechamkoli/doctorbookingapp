import { DoctorModel } from '../models/doctor.model';

export abstract class IDoctorRepository {
  abstract insert(request: DoctorModel): Promise<DoctorModel>;
}
