import { TestBed } from '@angular/core/testing';

import { EmployeesService } from './employees.service';
import { BaseTestBedConfigModule } from '@app/core/tests/base-test-bed-config-module';
import { Store } from '@ngxs/store';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { DialogResult } from '@app/core/enums/dialog-result.enum';
import { StatusType } from '@app/core/enums/status.enum';
import { SetEmployeeStatus } from '@app/core/store/employees/employees.actions';

describe(EmployeesService.name, () => {
  let service: EmployeesService;
  let matDialogMock: jasmine.SpyObj<MatDialog>;
  let storeMock: jasmine.SpyObj<Store>;
  const afterClosedSubject = new Subject<{ result: DialogResult }>();

  const openMock = {
    afterClosed: () => afterClosedSubject.asObservable(),
  } as MatDialogRef<unknown>;

  beforeEach(() => {
    matDialogMock = jasmine.createSpyObj<MatDialog>(MatDialog.name, [], {
      open: () => openMock,
    });

    storeMock = jasmine.createSpyObj<Store>(Store.name, ['dispatch']);

    TestBed.configureTestingModule({
      providers: [
        ...BaseTestBedConfigModule.providers,
        { provide: MatDialog, useValue: matDialogMock },
        { provide: Store, useValue: storeMock },
      ],
    });
    service = TestBed.inject(EmployeesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not invoke dispatch if offboarding cancelled', () => {
    // Arrange
    service.openOffboardDialog('1');

    // Act
    afterClosedSubject.next({ result: DialogResult.Cancel });

    // Assert
    expect(storeMock.dispatch).not.toHaveBeenCalled();
  });

  it('should invoke dispatch if offboarding succeeded', () => {
    // Arrange
    service.openOffboardDialog('1');

    // Act
    afterClosedSubject.next({ result: DialogResult.Ok });

    // Assert
    expect(storeMock.dispatch).toHaveBeenCalledWith(new SetEmployeeStatus('1', StatusType.Offboarded));
  });
});
