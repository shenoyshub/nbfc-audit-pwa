// import { Component } from '@angular/core';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';


import { MatTableDataSource } from '@angular/material/table';

export interface AuditType {
  name: string;
  code: string;
  category: string;
  regulation: string;
  frequency: string;
  status: string;
}

@Component({
  selector: 'app-audit-config',
  templateUrl: './audit-config.component.html',
  styleUrls: ['./audit-config.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTableModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule
  ],
})
export class AuditConfigComponent {
 displayedColumns = ['select','auditType','category','regulation','frequency','status','actions'];

  dataSource = new MatTableDataSource<AuditType>([
    {
      name: 'Statutory Audit',
      code: 'AUD-2024-001',
      category: 'Statutory',
      regulation: 'Companies Act 2013',
      frequency: 'Annual',
      status: 'ACTIVE'
    },
    {
      name: 'RBI Inspection',
      code: 'AUD-2024-015',
      category: 'Regulatory',
      regulation: 'RBI CAMELS',
      frequency: 'Ad-hoc',
      status: 'ACTIVE'
    }
  ]);
}
