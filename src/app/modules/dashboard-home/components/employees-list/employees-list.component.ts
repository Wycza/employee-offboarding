import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { EmployeesApi } from '@app/core/api/employees/employees.api';
import { Employee } from '@app/core/api/employees/employees.model';
import { EquipmentPipe } from '@app/shared/pipes/equipment/equipment-pipe';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatTabsModule, MatTableModule, EquipmentPipe, MatIconModule, MatButtonModule, MatMenuModule],
})
export class EmployeesListComponent {
  private readonly employeesApi = inject(EmployeesApi);
  displayedColumns: string[] = ['name', 'email', 'department', 'equipment', 'status', 'action'];
  dataSource = this.employeesApi.getEmployees();

  protected openDetailsPage(employee: Employee): void {
    console.log(employee);
  }

  protected startOffboarding(employee: Employee): void {
    console.log(employee);
  }
}
