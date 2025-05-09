import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffboardingComponent } from './offboarding.component';
import { BaseTestBedConfigModule } from '@app/core/tests/base-test-bed-config-module';

describe(OffboardingComponent.name, () => {
  let component: OffboardingComponent;
  let fixture: ComponentFixture<OffboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffboardingComponent],
      providers: [...BaseTestBedConfigModule.providers],
    }).compileComponents();

    fixture = TestBed.createComponent(OffboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
