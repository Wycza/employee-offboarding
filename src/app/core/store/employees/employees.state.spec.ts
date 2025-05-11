import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { GetEmployees, SetEmployeesFilter, SetEmployeeStatus } from './employees.actions';
import { EMPLOYEES_STATE_TOKEN, employeesDefaultState, EmployeesState } from './employees.state';
import { EmployeesApi } from '@app/core/api/employees/employees.api';
import { Employee } from '@app/core/api/employees/employees.model';
import { DepartmentType } from '@app/core/enums/department.enum';
import { BaseTestBedConfigModule } from '@app/core/tests/base-test-bed-config-module';
import { StatusType } from '@app/core/enums/status.enum';

describe(EmployeesState.name, () => {
  let store: Store;
  let employeesApiMock: jasmine.SpyObj<EmployeesApi>;

  const mockEmployees: Employee[] = [
    { id: '1', name: 'Mateusz', department: DepartmentType.Engineering } as Employee,
    { id: '2', name: 'Karol', department: DepartmentType.Sales } as Employee,
    { id: '3', name: 'Sylwia', department: DepartmentType.Engineering, status: StatusType.Active } as Employee,
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
      { id: '1', name: 'Mateusz', department: DepartmentType.Engineering } as Employee,
      { id: '3', name: 'Sylwia', department: DepartmentType.Engineering, status: StatusType.Active } as Employee,
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
    // Act
    store.dispatch(new SetEmployeesFilter('HR'));

    // Assert
    const state = store.selectSnapshot(EMPLOYEES_STATE_TOKEN);
    expect(state.filter).toBe('hr');
  });

  it('should set status for the existing employee', () => {
    // Arrange
    store.reset({
      [EMPLOYEES_STATE_TOKEN.getName()]: {
        employees: mockEmployees,
        filter: undefined,
      },
    });
    const empId = '3';
    const status = StatusType.Offboarded;

    // Act
    store.dispatch(new SetEmployeeStatus(empId, status));

    // Assert
    const state = store.selectSnapshot(EMPLOYEES_STATE_TOKEN);
    const employee = state.employees.find(({ id }) => id === empId);
    expect(state.employees.length).toBe(mockEmployees.length);
    expect(employee?.status).toBe(status);
  });

  it('should not set status if employee doesnt exist', () => {
    // Arrange
    store.reset({
      [EMPLOYEES_STATE_TOKEN.getName()]: {
        employees: mockEmployees,
        filter: undefined,
      },
    });
    const empId = '4';
    const status = StatusType.Offboarded;

    // Act
    store.dispatch(new SetEmployeeStatus(empId, status));

    // Assert
    const state = store.selectSnapshot(EMPLOYEES_STATE_TOKEN);
    expect(state.employees).toEqual(mockEmployees);
  });
});
