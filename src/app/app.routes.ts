import { Routes } from '@angular/router';
import { appUrls } from './core/consts/app-urls';

export const routes: Routes = [
  {
    path: appUrls.dashboard,
    loadComponent: () =>
      import('./modules/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    title: 'Dashboard',
    children: [
      {
        path: appUrls.dashboard,
        loadComponent: () =>
          import('./modules/dashboard-home/dashboard-home.component').then(
            (m) => m.DashboardHomeComponent
          ),
      },
      {
        path: appUrls.offboarding,
        loadComponent: () =>
          import('./modules/offboarding/offboarding.component').then(
            (m) => m.OffboardingComponent
          ),
        title: 'Offboarding',
      },
    ],
  },
];
