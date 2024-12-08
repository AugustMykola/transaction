import { Routes } from '@angular/router';
import { CoreComponent } from './dashboard/core/core.component';

export const routes: Routes = [
  {
    path: '**',
    redirectTo: 'core',
  },
  {
    path: 'core',
    component: CoreComponent,
  },
];
