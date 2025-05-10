import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { TabComponentComponent } from '@app/shared/components/tab-component/tab-component.component';
import { Store } from '@ngxs/store';
import { SetEmployeesFilter } from '@app/core/store/employees/employees.actions';
import { BehaviorSubject, debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatTabsModule, EmployeesListComponent, TabComponentComponent],
})
export class DashboardHomeComponent {
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);
  private readonly searchFilter$ = new BehaviorSubject<string>('');

  constructor() {
    this.updateFilterListener();
  }

  protected onSearchValueChange(value: string): void {
    this.searchFilter$.next(value);
  }

  private updateFilterListener(): void {
    this.searchFilter$.pipe(takeUntilDestroyed(this.destroyRef), debounceTime(300)).subscribe(value => {
      this.store.dispatch(new SetEmployeesFilter(value));
    });
  }
}
