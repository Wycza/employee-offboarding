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

export interface OffboardEmployeeQuery {
  id: string;
  address: {
    city: string;
    streetLine: string;
    country: string;
    postalCode: string;
    receiver: string;
  };
  notes: string | null;
  phone: string;
  email: string;
}
