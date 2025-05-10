import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabComponentComponent } from './tab-component.component';
import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { BaseTestBedConfigModule } from '@app/core/tests/base-test-bed-config-module';
import { By } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  template: `<app-tab-component>
    <mat-tab label="Label1">Content1</mat-tab>
    <mat-tab label="Label2">Content2</mat-tab>
  </app-tab-component>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TabComponentComponent, MatTabsModule],
})
class TestHostComponent {
  readonly tabComponent = viewChild.required(TabComponentComponent);
}

@Component({
  template: `<app-tab-component [searchInput]="true">
    <mat-tab label="Label1">Content1</mat-tab>
    <mat-tab label="Label2">Content2</mat-tab>
  </app-tab-component>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TabComponentComponent, MatTabsModule],
})
class TestHostWithInputComponent {
  readonly tabComponent = viewChild.required(TabComponentComponent);
}

describe(TabComponentComponent.name, () => {
  describe('base tests', () => {
    let component: TabComponentComponent;
    let fixture: ComponentFixture<TabComponentComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TabComponentComponent, MatFormFieldModule, MatInputModule, MatTabsModule],
        providers: [...BaseTestBedConfigModule.providers],
      }).compileComponents();

      fixture = TestBed.createComponent(TabComponentComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should emit input value', async () => {
      // Arrange
      const emitSpy = spyOn(component.searchValueChange, 'emit');
      fixture.componentRef.setInput('searchInput', true);
      await fixture.whenStable();
      const inputEl = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;

      // Act
      inputEl.value = 'TestValue';
      inputEl.dispatchEvent(new Event('input'));

      // Assert
      expect(emitSpy).toHaveBeenCalledWith('TestValue');
    });
  });

  describe(`with ${TestHostComponent.name}`, () => {
    let hostComponentFixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TabComponentComponent, TestHostComponent],
        providers: [...BaseTestBedConfigModule.providers],
      }).compileComponents();

      hostComponentFixture = TestBed.createComponent(TestHostComponent);
      hostComponent = hostComponentFixture.componentInstance;
      hostComponentFixture.detectChanges();
    });

    it('should create', () => {
      expect(hostComponent).toBeTruthy();
    });

    it('should call reset and not include search input tab', async () => {
      // Arrange
      const tabComponent = hostComponent.tabComponent();
      const resetSpy = spyOn(tabComponent['matTabGroup']()._allTabs, 'reset');
      const ngAfterContentInitSpy = spyOn(tabComponent['matTabGroup'](), 'ngAfterContentInit');

      // Act
      tabComponent.ngAfterViewInit();
      await hostComponentFixture.whenStable();

      // Assert
      expect(resetSpy).toHaveBeenCalledWith([jasmine.anything(), jasmine.anything()]);
      expect(ngAfterContentInitSpy).toHaveBeenCalled();
    });
  });

  describe(`with ${TestHostWithInputComponent.name}`, () => {
    let hostComponentFixture: ComponentFixture<TestHostWithInputComponent>;
    let hostComponent: TestHostWithInputComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TabComponentComponent, TestHostWithInputComponent],
        providers: [...BaseTestBedConfigModule.providers],
      }).compileComponents();

      hostComponentFixture = TestBed.createComponent(TestHostWithInputComponent);
      hostComponent = hostComponentFixture.componentInstance;
      hostComponentFixture.detectChanges();
    });

    it('should create', () => {
      expect(hostComponent).toBeTruthy();
    });

    it('should call reset and include search input tab', async () => {
      // Arrange
      const tabComponent = hostComponent.tabComponent();
      const resetSpy = spyOn(tabComponent['matTabGroup']()._allTabs, 'reset');
      const ngAfterContentInitSpy = spyOn(tabComponent['matTabGroup'](), 'ngAfterContentInit');

      // Act
      tabComponent.ngAfterViewInit();
      await hostComponentFixture.whenStable();

      // Assert
      expect(resetSpy).toHaveBeenCalledWith([jasmine.anything(), jasmine.anything(), jasmine.anything()]);
      expect(ngAfterContentInitSpy).toHaveBeenCalled();
    });
  });
});
