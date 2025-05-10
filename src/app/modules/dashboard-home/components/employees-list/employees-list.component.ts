import { ChangeDetectionStrategy, Component, AfterViewInit, viewChild, effect } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { Employee } from '@app/core/api/employees/employees.model';
import { appUrls } from '@app/core/consts/app-urls';
import { ColDef } from '@app/core/models/table.model';
import { EmployeesState } from '@app/core/store/employees/employees.state';
import { EquipmentPipe } from '@app/shared/pipes/equipment/equipment-pipe';
import { select } from '@ngxs/store';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatTabsModule,
    MatTableModule,
    EquipmentPipe,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSortModule,
    RouterLink,
  ],
})
export class EmployeesListComponent implements AfterViewInit {
  private readonly employees = select(EmployeesState.getEmployees);
  readonly matSort = viewChild.required(MatSort);
  protected readonly displayedColumns: ColDef<Employee>[] = [
    'name',
    'email',
    'department',
    'equipments',
    'status',
    'action',
  ];
  protected readonly dataSource = new MatTableDataSource<Employee>([]);
  protected readonly employeeUrl = appUrls.employee;

  constructor() {
    effect(() => {
      this.dataSource.data = this.employees();
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.matSort();
  }

  protected startOffboarding(employee: Employee): void {
    console.log(employee);
  }
}
