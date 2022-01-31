import { Slot } from "./slot.model";

export interface BookingModel {
  doctor: string;
  date: string;
  booking_id: string; 
  duration_mins: number;
  patient_name: string;
  patient_phone: string;
  slot: Slot;
}
