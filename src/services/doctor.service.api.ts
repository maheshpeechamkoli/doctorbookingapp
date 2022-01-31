import { DoctorModel } from '../models/doctor.model';

export abstract class IDoctorService {
  abstract addDoctor(request: DoctorModel): Promise<DoctorModel>;
}
