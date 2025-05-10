import { ResolveFn, Router } from '@angular/router';
import { Employee } from '@app/core/api/employees/employees.model';
import { EmployeesApi } from '@app/core/api/employees/employees.api';
import { inject } from '@angular/core';
import { catchError, EMPTY, take, tap } from 'rxjs';
import { appUrls } from '@app/core/consts/app-urls';
import { SnackbarService } from '@app/core/services/snackbar/snackbar.service';

export const employeeResolver: ResolveFn<Employee | undefined> = route => {
  const router = inject(Router);
  const employeesApi = inject(EmployeesApi);
  const snackbarService = inject(SnackbarService);
  const id = route.params['id'];

  const handleError = () => {
    console.error(`Error while fetching employee details: ${id}`); // Could be send to an external log service
    snackbarService.openSnackbar('Error while fetching employee details');
    router.navigate([appUrls.dashboard]);
  };

  return employeesApi.getEmployee(id).pipe(
    take(1),
    tap(res => {
      if (!res) {
        handleError();
      }
    }),
    catchError(() => {
      handleError();
      return EMPTY;
    })
  );
};
