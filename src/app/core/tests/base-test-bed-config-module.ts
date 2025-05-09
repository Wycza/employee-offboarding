import {
  EnvironmentProviders,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';

interface BaseTestBedConfigModule {
  providers: EnvironmentProviders[];
}

export const BaseTestBedConfigModule: BaseTestBedConfigModule = {
  providers: [provideExperimentalZonelessChangeDetection()],
};
