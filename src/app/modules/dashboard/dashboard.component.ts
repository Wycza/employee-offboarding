import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavListComponent } from './components/sidenav-list/sidenav-list.component';
import { Store } from '@ngxs/store';
import { GetEmployees } from '@app/core/store/employees/employees.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatToolbarModule,
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    SidenavListComponent,
  ],
})
export class DashboardComponent {
  private readonly store = inject(Store);

  constructor() {
    this.store.dispatch(new GetEmployees());
  }
}
