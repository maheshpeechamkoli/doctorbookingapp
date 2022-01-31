import { Slot } from "./slot.model";

export interface DoctorScheduleModel {
  doctor: string;
  date: string;
  slots: Slot[];
}