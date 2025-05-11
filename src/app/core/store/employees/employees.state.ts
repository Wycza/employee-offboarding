import { inject, Injectable } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { EmployeesStateModel } from './employees.state-model';
import { EmployeesApi } from '@app/core/api/employees/employees.api';
import { Employee } from '@app/core/api/employees/employees.model';
import { GetEmployees, SetEmployeesFilter, SetEmployeeStatus } from './employees.actions';
import { delay, Observable, tap } from 'rxjs';
import { patch, updateItem } from '@ngxs/store/operators';

export const EMPLOYEES_STATE_TOKEN = new StateToken<EmployeesStateModel>('employees');
export const employeesDefaultState: EmployeesStateModel = {
  employees: [],
  filter: undefined,
};

@State<EmployeesStateModel>({
  name: EMPLOYEES_STATE_TOKEN,
  defaults: employeesDefaultState,
})
@Injectable()
export class EmployeesState implements NgxsOnInit {
  private readonly employeesApi = inject(EmployeesApi);

  ngxsOnInit(ctx: StateContext<EmployeesStateModel>) {
    ctx.patchState({
      filter: undefined,
    });
  }

  @Selector()
  static getEmployees(state: EmployeesStateModel): Employee[] {
    if (!state.filter) {
      return state.employees;
    }

    const filter = state.filter;

    return state.employees.filter(
      ({ department, name }) =>
        department.toLocaleLowerCase().includes(filter) || name.toLocaleLowerCase().includes(filter)
    );
  }

  @Action(GetEmployees)
  getEmployees(ctx: StateContext<EmployeesStateModel>): Observable<Employee[]> {
    return this.employeesApi.getEmployees().pipe(
      delay(500), // Simulate network delays
      tap(res => {
        ctx.patchState({
          employees: res,
        });
      })
    );
  }

  @Action(SetEmployeesFilter)
  setEmployeesFilter(ctx: StateContext<EmployeesStateModel>, { filter }: SetEmployeesFilter): void {
    ctx.patchState({
      filter: filter?.toLocaleLowerCase(),
    });
  }

  @Action(SetEmployeeStatus)
  setEmployeeStatus(ctx: StateContext<EmployeesStateModel>, { id, status }: SetEmployeeStatus): void {
    ctx.setState(
      patch({
        employees: updateItem<Employee>(emp => emp.id === id, patch({ status: status })),
      })
    );
  }
}
