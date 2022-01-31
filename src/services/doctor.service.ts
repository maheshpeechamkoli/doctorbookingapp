import { Inject } from 'typescript-ioc';
import { DoctorModel } from '../models/doctor.model';
import { IDoctorRepository } from '../repository/doctor.repository.api';
import { IDoctorService } from './doctor.service.api';

export class DoctorService implements IDoctorService {
  @Inject
    doctorRepo!: IDoctorRepository;

  constructor() {}

  async addDoctor(request: DoctorModel) {
    return await this.doctorRepo.insert(request);
  }
}
