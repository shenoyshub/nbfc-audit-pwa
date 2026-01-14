import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'audit-findings-list',
    pathMatch: 'full'
  },

  {
    path: 'audit-findings-list',
    loadComponent: () =>
      import('./audit-findings-list/audit-findings-list.component')
        .then(m => m.AuditFindingsListComponent)
  },

  {
    path: 'audit-findings',
    loadComponent: () =>
      import('./audit-findings/audit-findings.component')
        .then(m => m.AuditFindingsComponent)
  },

  {
    path: '**',
    redirectTo: 'audit-findings-list'
  }
];
