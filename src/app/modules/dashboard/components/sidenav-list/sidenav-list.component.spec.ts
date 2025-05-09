import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavListComponent } from './sidenav-list.component';
import { BaseTestBedConfigModule } from '@app/core/tests/base-test-bed-config-module';
import { ActivatedRoute } from '@angular/router';

describe(SidenavListComponent.name, () => {
  let component: SidenavListComponent;
  let fixture: ComponentFixture<SidenavListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavListComponent],
      providers: [...BaseTestBedConfigModule.providers, { provide: ActivatedRoute, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
