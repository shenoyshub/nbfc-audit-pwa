import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'audit-dashboard',
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
    path : 'audit-dashboard', loadComponent: ()=> import('./auditdashboard/auditdashboard.component').then(m=>m.AuditdashboardComponent)
  },
  {
    path : 'audit-types', loadComponent: ()=> import('./audit-types/audit-types.component').then(m=>m.AuditTypesComponent)
  },
  {
    path : 'auditors',loadComponent:()=>import('./createauditors/createauditors.component').then(m=>m.CreateauditorsComponent)
  }
  ,
   {
    path : 'audit-schedules',loadComponent:()=>import('./audit-schedules/audit-schedules.component').then(m=>m.AuditSchedulesComponent)
  }
  ,
  {
    path : 'audit-checklist',loadComponent:()=>import('./auditchecklist/auditchecklist.component').then(m=>m.AuditchecklistComponent)
  },

  {
    path: '**',
    redirectTo: 'audit-dashboard'

  }
];
