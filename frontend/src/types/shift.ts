import { MemberProps } from './user';

export interface ShiftProps {
  id: number;
  shiftType: number;
  member?: MemberProps;
  date: string;
}

export interface ShiftDateProps {
  date: string;
  shifts: Array<ShiftProps>;
}
