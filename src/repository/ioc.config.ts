import { ContainerConfiguration, Scope } from 'typescript-ioc';
import { BookingRespository } from './booking.repository';
import { IBookingRepository } from './booking.repository.api';
import { DoctorRespository } from './doctor.repository';
import { IDoctorRepository } from './doctor.repository.api';
import { DoctorScheduleRespository } from './doctor_schedule.repository';
import { IDoctorScheduleRepository } from './doctor_schedule.repository.api';
import { UserRespository } from './user.repository';
import { IUserRepository } from './user.repository.api';

const config: ContainerConfiguration[] = [
  {
    bind: IUserRepository,
    to: UserRespository,
    scope: Scope.Singleton,
  },
  {
    bind: IDoctorRepository,
    to: DoctorRespository,
    scope: Scope.Singleton,
  },
  {
    bind: IDoctorScheduleRepository,
    to: DoctorScheduleRespository,
    scope: Scope.Singleton,
  },
  {
    bind: IBookingRepository,
    to: BookingRespository,
    scope: Scope.Singleton,
  },
];

export default config;
