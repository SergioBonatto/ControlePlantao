import { Employee } from './employee';
import { Advance } from './advance';

export interface ShiftControlProps {
  onEmployeeAdded?: (employee: Employee) => void;
  advances?: Advance[];
  employees?: Employee[];
}

export interface AdvancePaymentProps {
  employees: Employee[];
  onSaveAdvance: (advance: Advance) => void;
  advances?: Advance[];
}
