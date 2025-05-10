import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SnackbarService } from './snackbar.service';
import { BaseTestBedConfigModule } from '@app/core/tests/base-test-bed-config-module';

describe(SnackbarService.name, () => {
  let service: SnackbarService;
  let matSnackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...BaseTestBedConfigModule.providers, SnackbarService],
    });

    service = TestBed.inject(SnackbarService);
    matSnackBar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open snackbar with given text and duration', () => {
    // Arrange
    spyOn(matSnackBar, 'open');
    const message = 'test';
    const duration = 1000;

    // Act
    service.openSnackbar(message, duration);

    // Assert
    expect(matSnackBar.open).toHaveBeenCalledWith('test', '', { duration });
  });
});
