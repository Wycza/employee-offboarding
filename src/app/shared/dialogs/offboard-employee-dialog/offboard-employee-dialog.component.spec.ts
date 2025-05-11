import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffboardEmployeeDialogComponent, OffboardEmployeeDialogData } from './offboard-employee-dialog.component';
import { BaseTestBedConfigModule } from '@app/core/tests/base-test-bed-config-module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeesApi } from '@app/core/api/employees/employees.api';
import { of } from 'rxjs';

describe(OffboardEmployeeDialogComponent.name, () => {
  let component: OffboardEmployeeDialogComponent;
  let fixture: ComponentFixture<OffboardEmployeeDialogComponent>;
  let employeeApiMock: jasmine.SpyObj<EmployeesApi>;

  beforeEach(async () => {
    employeeApiMock = jasmine.createSpyObj<EmployeesApi>(EmployeesApi.name, ['offboard']);

    await TestBed.configureTestingModule({
      imports: [OffboardEmployeeDialogComponent],
      providers: [
        ...BaseTestBedConfigModule.providers,
        { provide: MatDialogRef, useValue: { close: () => null } },
        { provide: EmployeesApi, useValue: employeeApiMock },
        { provide: MAT_DIALOG_DATA, useValue: { id: '1' } as OffboardEmployeeDialogData },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OffboardEmployeeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not offboard employee if form is invalid', () => {
    // Act
    component['submit']();

    // Assert
    expect(employeeApiMock.offboard).not.toHaveBeenCalled();
  });

  it('should offboard employee if form is valid', () => {
    // Arrange
    employeeApiMock.offboard.and.returnValue(of(true));
    component['form'].patchValue({
      city: 'city',
      country: 'country',
      email: 'test@email.com',
      notes: 'notes',
      phone: 'phone',
      postalCode: '12-345',
      receiver: 'receiver',
      streetLine: 'streetLine',
    });

    // Act
    component['submit']();

    // Assert
    expect(employeeApiMock.offboard).toHaveBeenCalled();
  });
});
