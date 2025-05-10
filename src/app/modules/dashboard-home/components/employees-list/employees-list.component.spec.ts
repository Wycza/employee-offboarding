import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesListComponent } from './employees-list.component';
import { BaseTestBedConfigModule } from '@app/core/tests/base-test-bed-config-module';
import { EmployeesApi } from '@app/core/api/employees/employees.api';
import { of } from 'rxjs';
import { provideStore, Store } from '@ngxs/store';
import { EmployeesState } from '@app/core/store/employees/employees.state';
import { GetEmployees } from '@app/core/store/employees/employees.actions';
import { Employee } from '@app/core/api/employees/employees.model';
import { DepartmentType } from '@app/core/enums/department.enum';
import { ActivatedRoute } from '@angular/router';

describe(EmployeesListComponent.name, () => {
  let component: EmployeesListComponent;
  let fixture: ComponentFixture<EmployeesListComponent>;
  let store: Store;

  const mockEmployees: Employee[] = [
    { name: 'Mateusz', department: DepartmentType.Engineering } as Employee,
    { name: 'Karol', department: DepartmentType.Sales } as Employee,
    { name: 'Sylwia', department: DepartmentType.Engineering } as Employee,
  ];

  const employeesApiMock = jasmine.createSpyObj<EmployeesApi>(EmployeesApi.name, ['getEmployees']);

  beforeAll(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeesListComponent],
      providers: [
        ...BaseTestBedConfigModule.providers,
        provideStore([EmployeesState]),
        { provide: EmployeesApi, useValue: employeesApiMock },
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeesListComponent);
    store = TestBed.inject(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set data for the table', () => {
    // Arrange
    employeesApiMock.getEmployees.and.returnValue(of(mockEmployees));

    // Act
    store.dispatch(new GetEmployees());
    jasmine.clock().tick(600);

    // Assert
    expect(component['dataSource'].data).toEqual(mockEmployees);
  });
});
