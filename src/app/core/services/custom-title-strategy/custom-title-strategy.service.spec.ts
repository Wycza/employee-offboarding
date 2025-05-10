import { DOCUMENT } from '@angular/common';
import { provideLocationMocks } from '@angular/common/testing';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { provideRouter, Router, TitleStrategy } from '@angular/router';

import { CustomTitleStrategy } from './custom-title-strategy.service';
import { BaseTestBedConfigModule } from '@app/core/tests/base-test-bed-config-module';

@Component({
  template: '',
})
class TestComponent {}

describe(CustomTitleStrategy.name, () => {
  let service: TitleStrategy;
  let router: Router;
  let document: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ...BaseTestBedConfigModule.providers,
        provideLocationMocks(),
        provideRouter([]),
        Title,
        { provide: TitleStrategy, useClass: CustomTitleStrategy },
      ],
    });

    router = TestBed.inject(Router);
    document = TestBed.inject(DOCUMENT);
  });

  it('should create', () => {
    service = TestBed.inject(TitleStrategy);
    expect(service).toBeTruthy();
  });

  it('should update title', async () => {
    // Arrange
    const title = 'Title';
    const titleService = TestBed.inject(Title);

    spyOn(titleService, 'setTitle').and.callThrough();

    router.resetConfig([
      {
        path: 'test',
        component: TestComponent,
        title,
      },
    ]);

    // Act
    await router.navigateByUrl('/test');

    // Assert
    expect(document.title).toBe(`${title} - Tequipy`);
  });

  it('should set default title', async () => {
    // Arrange
    const titleService = TestBed.inject(Title);
    spyOn(titleService, 'setTitle').and.callThrough();

    router.resetConfig([
      {
        path: 'test',
        component: TestComponent,
      },
    ]);

    // Act
    await router.navigateByUrl('/test');

    // Assert
    expect(document.title).toBe('Tequipy');
    expect(titleService.setTitle).toHaveBeenCalledWith('Tequipy');
  });
});
