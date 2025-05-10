import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Employee } from './employees.model';
import { Observable, of } from 'rxjs';
import { DepartmentType } from '@app/core/enums/department.enum';
import { StatusType } from '@app/core/enums/status.enum';
import { v4 } from 'uuid';

const temporaryList: Employee[] = [
  {
    id: v4(),
    name: 'Justine Owens',
    email: 'user1@tequipy.com',
    department: DepartmentType.Sales,
    equipments: [
      { id: v4(), name: 'MacBook Pro' },
      { id: v4(), name: 'Xiaomi Mi 3' },
      { id: v4(), name: 'Dell 200XP' },
    ],
    status: StatusType.Active,
  },
  {
    id: v4(),
    name: 'Gloria Rice',
    email: 'user2@tequipy.com',
    department: DepartmentType.Sales,
    equipments: [{ id: v4(), name: 'MacBook Set' }],
    status: StatusType.Active,
  },
  {
    id: v4(),
    name: 'Sianna Hutchings',
    email: 'user3@tequipy.com',
    department: DepartmentType.Engineering,
    equipments: [{ id: v4(), name: "MacBook Pro '16" }],
    status: StatusType.Active,
  },
  {
    id: v4(),
    name: 'Roza Horner',
    email: 'user4@tequipy.com',
    department: DepartmentType.Marketing,
    equipments: [
      { id: v4(), name: 'MacBook Pro' },
      { id: v4(), name: 'Xiaomi Mi 3' },
      { id: v4(), name: 'Dell 200XP' },
    ],
    status: StatusType.Active,
  },
  {
    id: v4(),
    name: 'Agata Bradley',
    email: 'user5@tequipy.com',
    department: DepartmentType.Engineering,
    equipments: [{ id: v4(), name: 'MacBook Pro' }],
    status: StatusType.Active,
  },
  {
    id: v4(),
    name: 'Wanda Goff',
    email: 'user6@tequipy.com',
    department: DepartmentType.Engineering,
    equipments: [
      { id: v4(), name: 'MacBook Pro' },
      { id: v4(), name: 'Xiaomi Mi 3' },
      { id: v4(), name: 'Dell 200XP' },
    ],
    status: StatusType.Offboarded,
  },
  {
    id: v4(),
    name: 'Amrita Blackmore',
    email: 'user7@tequipy.com',
    department: DepartmentType.Marketing,
    equipments: [{ id: v4(), name: 'MacBook Set' }],
    status: StatusType.Active,
  },
  {
    id: v4(),
    name: 'Ayman Hanson',
    email: 'user8@tequipy.com',
    department: DepartmentType.Engineering,
    equipments: [{ id: v4(), name: "MacBook Pro '16" }],
    status: StatusType.Offboarded,
  },
  {
    id: v4(),
    name: 'Simone Hardin',
    email: 'user9@tequipy.com',
    department: DepartmentType.Engineering,
    equipments: [{ id: v4(), name: "MacBook Pro '16" }],
    status: StatusType.Active,
  },
];

@Injectable({
  providedIn: 'root',
})
export class EmployeesApi {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = '/employees';

  getEmployees(): Observable<Employee[]> {
    return of(temporaryList);
  }

  getEmployee(id: string): Observable<Employee | undefined> {
    return of(temporaryList.find(x => x.id === id));
  }
}
