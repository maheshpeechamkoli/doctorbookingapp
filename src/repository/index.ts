import { Container } from "typescript-ioc";

export * from './user.repository.api';
export * from './doctor.repository.api';
export * from './doctor_schedule.repository.api';
export * from './booking.repository.api';

import config from './ioc.config';

Container.configure(...config);
