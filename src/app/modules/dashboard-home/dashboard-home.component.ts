import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { TabComponentComponent } from '@app/shared/components/tab-component/tab-component.component';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatTabsModule, EmployeesListComponent, TabComponentComponent],
})
export class DashboardHomeComponent {
  protected onSearchValueChange(value: string): void {
    console.log(value);
  }
}
