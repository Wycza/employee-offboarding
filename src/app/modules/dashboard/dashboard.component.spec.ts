import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { SidenavListComponent } from './components/sidenav-list/sidenav-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BaseTestBedConfigModule } from '@app/core/tests/base-test-bed-config-module';
import { provideStore } from '@ngxs/store';

describe(DashboardComponent.name, () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [...BaseTestBedConfigModule.providers, provideStore([])],
    })
      .overrideComponent(DashboardComponent, {
        remove: {
          imports: [SidenavListComponent],
        },
        add: {
          schemas: [CUSTOM_ELEMENTS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
