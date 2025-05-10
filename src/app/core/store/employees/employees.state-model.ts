import { Employee } from '@app/core/api/employees/employees.model';

export interface EmployeesStateModel {
  employees: Employee[];
  filter: string | undefined;
}
