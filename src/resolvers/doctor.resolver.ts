import { Inject } from 'typescript-ioc';
import { Arg, Mutation, Query, Resolver, Root } from 'type-graphql';
import { resolverManager } from './_resolver-manager';
import { Doctor } from '../schemas/doctor.schema';
import { IDoctorService } from '../services/doctor.service.api';

@Resolver((of) => Doctor)
export class DoctorResolver {
  @Inject
  doctorService!: IDoctorService;

  @Mutation((returns) => Doctor)
  async addDoctor(@Arg("doctor")  doctor: Doctor): Promise<Doctor> {
    return this.doctorService.addDoctor(doctor);
  }
}

resolverManager.registerResolver(DoctorResolver);
