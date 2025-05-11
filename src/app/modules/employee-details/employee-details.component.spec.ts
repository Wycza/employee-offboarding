import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDetailsComponent } from './employee-details.component';
import { BaseTestBedConfigModule } from '@app/core/tests/base-test-bed-config-module';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '@app/core/api/employees/employees.model';
import { DepartmentType } from '@app/core/enums/department.enum';
import { StatusType } from '@app/core/enums/status.enum';
import { EmployeesService } from '@app/core/services/employees/employees.service';

describe(EmployeeDetailsComponent.name, () => {
  let component: EmployeeDetailsComponent;
  let fixture: ComponentFixture<EmployeeDetailsComponent>;

  const employee: Employee = {
    id: '1',
    department: DepartmentType.Engineering,
    email: '',
    name: '',
    status: StatusType.Active,
    equipments: [],
  };

  const activatedRouteMock = { snapshot: { data: { employee: employee } } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDetailsComponent],
      providers: [
        ...BaseTestBedConfigModule.providers,
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: EmployeesService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
