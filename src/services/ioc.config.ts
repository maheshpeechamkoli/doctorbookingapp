import {ContainerConfiguration, Scope} from 'typescript-ioc';
import { BookingService } from './booking.service';
import { IBookingService } from './booking.service.api';
import { DoctorService } from './doctor.service';
import { IDoctorService } from './doctor.service.api';
import { DoctorScheduleService } from './doctor_schedule.service';
import { IDoctorScheduleService } from './doctor_schedule.service.api';
import { UserService } from './user.service';
import { IUserService } from './user.service.api';


const config: ContainerConfiguration[] = [
  {
    bind: IUserService,
    to: UserService,
    scope: Scope.Singleton,
  },
  {
    bind: IDoctorService,
    to: DoctorService,
    scope: Scope.Singleton,
  },
  {
    bind: IDoctorScheduleService,
    to: DoctorScheduleService,
    scope: Scope.Singleton,
  },
  {
    bind: IBookingService,
    to: BookingService,
    scope: Scope.Singleton,
  },
];

export default config;
