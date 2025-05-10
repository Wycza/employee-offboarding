import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHomeComponent } from './dashboard-home.component';
import { BaseTestBedConfigModule } from '@app/core/tests/base-test-bed-config-module';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetEmployeesFilter } from '@app/core/store/employees/employees.actions';

describe(DashboardHomeComponent.name, () => {
  let component: DashboardHomeComponent;
  let fixture: ComponentFixture<DashboardHomeComponent>;
  let storeSpy: jasmine.SpyObj<Store>;

  beforeAll(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate();
  });

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj<Store>(Store.name, ['dispatch']);

    await TestBed.configureTestingModule({
      imports: [DashboardHomeComponent],
      providers: [
        ...BaseTestBedConfigModule.providers,
        {
          provide: Store,
          useValue: storeSpy,
        },
      ],
    })
      .overrideComponent(DashboardHomeComponent, {
        remove: { imports: [EmployeesListComponent] },
        add: { schemas: [CUSTOM_ELEMENTS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch only once if value has changed in less than 300 ms', () => {
    // Act
    component['onSearchValueChange']('T');
    jasmine.clock().tick(200);
    component['onSearchValueChange']('Test');
    jasmine.clock().tick(300);

    // Assert
    expect(storeSpy.dispatch).toHaveBeenCalledOnceWith(new SetEmployeesFilter('Test'));
  });

  it('should dispatch twice if difference between each event is more than 300 ms', () => {
    // Act
    component['onSearchValueChange']('T');
    jasmine.clock().tick(400);
    component['onSearchValueChange']('Test');
    jasmine.clock().tick(300);

    // Assert
    expect(storeSpy.dispatch).toHaveBeenCalledTimes(2);
    expect(storeSpy.dispatch.calls.allArgs()).toEqual([
      [new SetEmployeesFilter('T')],
      [new SetEmployeesFilter('Test')],
    ]);
  });
});
