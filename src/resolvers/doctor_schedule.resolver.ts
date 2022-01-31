import { Inject } from 'typescript-ioc';
import { Arg, Mutation, Query, Resolver, Root } from 'type-graphql';
import { resolverManager } from './_resolver-manager';
import { DoctorSchedule } from '../schemas/doctor_schedule.schema';
import { IDoctorScheduleService } from '../services/doctor_schedule.service.api';

@Resolver((of) => DoctorSchedule)
export class DoctorScheduleResolver {
  @Inject
  doctorScheduleService!: IDoctorScheduleService;

  @Mutation((returns) => DoctorSchedule)
  async addDoctorSchedule(@Arg("doctor_schedule")  doctorSchedule: DoctorSchedule): Promise<DoctorSchedule> {
    return this.doctorScheduleService.addDoctorSchedule(doctorSchedule);
  }
}

resolverManager.registerResolver(DoctorScheduleResolver);
