export type Advance = {
  id: string;
  employeeName: string;
  amount: number;
  date: string;
  relatedShiftDate?: string;
  relatedShiftType?: 'Diurno' | 'Noturno';
  observation?: string;
};
