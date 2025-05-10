import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '@app/core/api/employees/employees.model';
import { StatusType } from '@app/core/enums/status.enum';
import { BackButtonComponent } from '@app/shared/components/back-button/back-button.component';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatTableModule, BackButtonComponent],
})
export class EmployeeDetailsComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  protected readonly employeeDetails: Employee;
  protected readonly displayedColumns = ['item'];
  protected readonly dataSource: string[] = [];
  protected readonly StatusType = StatusType;

  constructor() {
    this.employeeDetails = this.activatedRoute.snapshot.data['employee'];
    this.dataSource = this.employeeDetails.equipments.map(eq => eq.name);
  }
}
