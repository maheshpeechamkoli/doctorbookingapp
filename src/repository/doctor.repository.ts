import { DoctorModel } from '../models/doctor.model';
import { IDoctorRepository } from './doctor.repository.api';

const Doctors = require('../repository/entity/doctors');

export class DoctorRespository implements IDoctorRepository {
  async insert(request: DoctorModel) {
    return await Doctors.create(request).then((response: DoctorModel) => {
      return response;
    });
  }
}
