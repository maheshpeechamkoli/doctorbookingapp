import { Slot } from "./slot.model";

export interface FreeSlotsModel {
  doctor: string;
  date: string;
  duration: number;
  slots: Slot[];
}
