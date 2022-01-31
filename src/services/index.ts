import { Container } from "typescript-ioc";

export * from './user.service.api';
export * from './doctor.service.api';
export * from './doctor_schedule.service.api';
export * from './booking.service.api';

import config from './ioc.config';

Container.configure(...config);
