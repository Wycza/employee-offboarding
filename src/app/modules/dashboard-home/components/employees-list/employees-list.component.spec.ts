import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesListComponent } from './employees-list.component';
import { BaseTestBedConfigModule } from '@app/core/tests/base-test-bed-config-module';
import { EmployeesApi } from '@app/core/api/employees/employees.api';
import { of } from 'rxjs';

describe(EmployeesListComponent.name, () => {
  let component: EmployeesListComponent;
  let fixture: ComponentFixture<EmployeesListComponent>;
  const employeesApiMock = jasmine.createSpyObj<EmployeesApi>(EmployeesApi.name, [], {
    getEmployees: () => of([]),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeesListComponent],
      providers: [...BaseTestBedConfigModule.providers, { provide: EmployeesApi, useValue: employeesApiMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
