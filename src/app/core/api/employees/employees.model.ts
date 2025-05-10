import { DepartmentType } from '@app/core/enums/department.enum';
import { StatusType } from '@app/core/enums/status.enum';
import { Equipment } from '@app/core/models/equipment.model';

export interface Employee {
  id: string;
  name: string;
  department: DepartmentType;
  status: StatusType;
  email: string;
  equipments: Equipment[];
}
