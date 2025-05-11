import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EmployeesApi } from '@app/core/api/employees/employees.api';
import { OffboardEmployeeQuery } from '@app/core/api/employees/employees.model';
import { DialogResult } from '@app/core/enums/dialog-result.enum';
import { FormsModel } from '@app/core/models/forms.model';
import { SnackbarService } from '@app/core/services/snackbar/snackbar.service';
import { getControlError } from '@app/core/utils/forms/forms.utils';

interface OffboardEmployeeFormModel {
  receiver: string;
  email: string;
  phone: string;
  streetLine: string;
  city: string;
  postalCode: string;
  country: string;
  notes: string | null;
}

export interface OffboardEmployeeDialogFormResult {
  result: DialogResult;
}

export interface OffboardEmployeeDialogData {
  id: string;
}

@Component({
  selector: 'app-offboard-employee-dialog',
  templateUrl: './offboard-employee-dialog.component.html',
  styleUrl: './offboard-employee-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
})
export class OffboardEmployeeDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<OffboardEmployeeDialogFormResult>);
  private readonly employeesApi = inject(EmployeesApi);
  private readonly snackbarService = inject(SnackbarService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialogData = inject<OffboardEmployeeDialogData>(MAT_DIALOG_DATA);

  protected readonly form = new FormGroup<FormsModel<OffboardEmployeeFormModel>>({
    receiver: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    phone: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    streetLine: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    city: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    postalCode: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\d{2}[-]?\d{3}$/)],
    }),
    country: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    notes: new FormControl(null),
  });

  protected getControlError(control: FormControl): string | null {
    return getControlError(control);
  }

  protected submit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    this.offboardEmployee();
  }

  protected cancel(): void {
    this.dialogRef.close({
      result: DialogResult.Cancel,
    });
  }

  private offboardEmployee(): void {
    const { receiver, email, phone, streetLine, city, postalCode, country, notes } = this.form.getRawValue();
    const query: OffboardEmployeeQuery = {
      address: {
        country,
        postalCode,
        receiver,
        streetLine,
        city,
      },
      email,
      notes,
      phone,
      id: this.dialogData.id,
    };

    this.employeesApi
      .offboard(query)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.snackbarService.openSnackbar('User has been offboarded.');
          this.dialogRef.close({
            result: DialogResult.Ok,
            data: this.form.getRawValue(),
          });
        },
        error: () => {
          this.snackbarService.openSnackbar('There was an error. Try again.');
        },
      });
  }
}
