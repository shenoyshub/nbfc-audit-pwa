import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
export const routes: Routes = [
  {
    path: '',

    redirectTo: 'audit-dashboard',
    pathMatch: 'full'
  },
   { path: 'logout',
    loadComponent: () =>
      import(
        './logout/logout.component'
      ).then((c) => c.LogoutComponent),
  },
   { path: 'login-redirect',
    loadComponent: () =>
      import(
        './login-redirect/login-redirect.component'
      ).then((c) => c.LoginRedirectComponent),
  },
  {
    path: 'audit-findings-list',
      canActivate: [authGuard],
    loadComponent: () =>
      import('./audit-findings-list/audit-findings-list.component')
        .then(m => m.AuditFindingsListComponent)
  },

  {
    path: 'audit-findings',
      canActivate: [authGuard],
    loadComponent: () =>
      import('./audit-findings/audit-findings.component')
        .then(m => m.AuditFindingsComponent)
  },
  {
    path : 'audit-dashboard',  canActivate: [authGuard], loadComponent: ()=> import('./auditdashboard/auditdashboard.component').then(m=>m.AuditdashboardComponent)
  },
  {
    path : 'audit-types',  canActivate: [authGuard], loadComponent: ()=> import('./audit-types/audit-types.component').then(m=>m.AuditTypesComponent)
  },
  {
    path : 'auditors',  canActivate: [authGuard],loadComponent:()=>import('./createauditors/createauditors.component').then(m=>m.CreateauditorsComponent)
  }
  ,
   {
    path : 'audit-schedules',  canActivate: [authGuard],loadComponent:()=>import('./audit-schedules/audit-schedules.component').then(m=>m.AuditSchedulesComponent)
  }
  ,
  {
    path : 'audit-checklist',loadComponent:()=>import('./auditchecklist/auditchecklist.component').then(m=>m.AuditchecklistComponent)
  },
  {
    path : 'audit-user-groups' , loadComponent : ()=>import('./audit-user-groups/audit-user-groups.component').then(m=>m.AuditUserGroupsComponent)
  }
  ,
  {
    path : 'audit-category', loadComponent :()=>import('./audit-category/audit-category.component').then(m=>m.AuditCategoryComponent)
  },
  {
    path : 'audit-configurationTest', loadComponent :()=>import('./audit-configuration/audit-configuration.component').then(m=>m.AuditConfigurationComponent)
  },
  {
    path : 'audit-configuration', loadComponent :()=>import('./audit-config/audit-config.component').then(m=>m.AuditConfigComponent)
  },
  {
    path: '**',
    redirectTo: 'audit-dashboard'

  }
];
