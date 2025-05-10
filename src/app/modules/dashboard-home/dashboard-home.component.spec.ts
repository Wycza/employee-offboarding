import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHomeComponent } from './dashboard-home.component';
import { BaseTestBedConfigModule } from '@app/core/tests/base-test-bed-config-module';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe(DashboardHomeComponent.name, () => {
  let component: DashboardHomeComponent;
  let fixture: ComponentFixture<DashboardHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardHomeComponent],
      providers: [...BaseTestBedConfigModule.providers],
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
