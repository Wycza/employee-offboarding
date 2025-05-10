import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { GetEmployees, SetEmployeesFilter } from './employees.actions';
import { EMPLOYEES_STATE_TOKEN, employeesDefaultState, EmployeesState } from './employees.state';
import { EmployeesApi } from '@app/core/api/employees/employees.api';
import { Employee } from '@app/core/api/employees/employees.model';
import { DepartmentType } from '@app/core/enums/department.enum';
import { BaseTestBedConfigModule } from '@app/core/tests/base-test-bed-config-module';

describe(EmployeesState.name, () => {
  let store: Store;
  let employeesApiMock: jasmine.SpyObj<EmployeesApi>;

  const mockEmployees: Employee[] = [
    { name: 'Mateusz', department: DepartmentType.Engineering } as Employee,
    { name: 'Karol', department: DepartmentType.Sales } as Employee,
    { name: 'Sylwia', department: DepartmentType.Engineering } as Employee,
  ];

  beforeEach(() => {
    employeesApiMock = jasmine.createSpyObj<EmployeesApi>(EmployeesApi.name, ['getEmployees']);

    TestBed.configureTestingModule({
      providers: [
        ...BaseTestBedConfigModule.providers,
        provideStore([EmployeesState]),
        { provide: EmployeesApi, useValue: employeesApiMock },
      ],
    });

    store = TestBed.inject(Store);
    store.reset({
      ...store.snapshot(),
      [EMPLOYEES_STATE_TOKEN.getName()]: employeesDefaultState,
    });
  });

  it('should have default state', () => {
    // Assert
    const state = store.selectSnapshot(EMPLOYEES_STATE_TOKEN);
    expect(state).toEqual({ employees: [], filter: undefined });
  });

  it('should get all employees if no filter is set', () => {
    // Arrange
    store.reset({
      [EMPLOYEES_STATE_TOKEN.getName()]: {
        employees: mockEmployees,
        filter: undefined,
      },
    });

    // Act
    const employees = store.selectSnapshot(EmployeesState.getEmployees);

    // Assert
    expect(employees.length).toBe(3);
  });

  it('should filter employees by name or department', () => {
    // Arrange
    store.reset({
      [EMPLOYEES_STATE_TOKEN.getName()]: {
        employees: mockEmployees,
        filter: 'eng',
      },
    });

    // Act
    const filtered = store.selectSnapshot(EmployeesState.getEmployees);

    // Assert
    expect(filtered).toEqual([
      { name: 'Mateusz', department: DepartmentType.Engineering } as Employee,
      { name: 'Sylwia', department: DepartmentType.Engineering } as Employee,
    ]);
  });

  it('should set employees from API when GetEmployees is dispatched', done => {
    // Arrange
    employeesApiMock.getEmployees.and.returnValue(of(mockEmployees));

    // Act
    store.dispatch(new GetEmployees()).subscribe(() => {
      // Assert
      const state = store.selectSnapshot(EMPLOYEES_STATE_TOKEN);
      expect(state.employees).toEqual(mockEmployees);
      done();
    });
  });

  it('should update filter when SetEmployeesFilter is dispatched', () => {
    store.dispatch(new SetEmployeesFilter('HR'));

    const state = store.selectSnapshot(EMPLOYEES_STATE_TOKEN);
    expect(state.filter).toBe('hr');
  });
});
