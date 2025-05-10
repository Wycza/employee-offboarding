import { ChangeDetectionStrategy, Component, DebugElement } from '@angular/core';
import { StopPropagationDirective } from './stop-propagation.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseTestBedConfigModule } from '@app/core/tests/base-test-bed-config-module';
import { By } from '@angular/platform-browser';

@Component({
  imports: [StopPropagationDirective],
  template: `<button appStopPropagation>Click</button>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {}

describe(StopPropagationDirective.name, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let buttonEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [...BaseTestBedConfigModule.providers],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    buttonEl = fixture.debugElement.query(By.css('button'));
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    // Act
    const directive = new StopPropagationDirective();

    // Assert
    expect(directive).toBeTruthy();
  });

  it('should call stopPropagation on click', () => {
    // Arrange
    const event = new MouseEvent('click');
    spyOn(event, 'stopPropagation');

    // Act
    buttonEl.nativeElement.dispatchEvent(event);

    // Assert
    expect(event.stopPropagation).toHaveBeenCalled();
  });
});
