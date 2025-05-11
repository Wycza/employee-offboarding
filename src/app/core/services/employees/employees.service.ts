import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { appUrls } from '@app/core/consts/app-urls';
import { DialogResult } from '@app/core/enums/dialog-result.enum';
import { StatusType } from '@app/core/enums/status.enum';
import { SetEmployeeStatus } from '@app/core/store/employees/employees.actions';
import {
  OffboardEmployeeDialogComponent,
  OffboardEmployeeDialogData,
  OffboardEmployeeDialogFormResult,
} from '@app/shared/dialogs/offboard-employee-dialog/offboard-employee-dialog.component';
import { Store } from '@ngxs/store';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private readonly dialog = inject(MatDialog);
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  openOffboardDialog(id: string): void {
    this.dialog
      .open<OffboardEmployeeDialogComponent, OffboardEmployeeDialogData, OffboardEmployeeDialogFormResult>(
        OffboardEmployeeDialogComponent,
        {
          data: { id },
        }
      )
      .afterClosed()
      .pipe(filter(res => res?.result === DialogResult.Ok))
      .subscribe(() => {
        this.store.dispatch(new SetEmployeeStatus(id, StatusType.Offboarded));
        this.router.navigate([appUrls.dashboard]);
      });
  }
}
