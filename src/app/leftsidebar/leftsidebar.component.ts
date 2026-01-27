import { Component, OnInit ,inject, } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-leftsidebar',
  templateUrl: './leftsidebar.component.html',
  styleUrls: ['./leftsidebar.component.css'],
  standalone : true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    CommonModule,

  ],
})
export class LeftsidebarComponent implements OnInit {
  private router = inject(Router);
   isExpanded = false;
     toggleSideMenu() {
    this.isExpanded = !this.isExpanded;
  }
  constructor() { }

  ngOnInit() {
  }
  auditDashboard(){
    this.router.navigate(['/audit-dashboard']);
  }
  auditType(){
    this.router.navigate(['/audit-types']);
  }
  auditors(){
    this.router.navigate(['/auditors']);
  }
  auditSchedules(){
    this.router.navigate(['/audit-schedules']);
  }
   auditFindings(){
    this.router.navigate(['/audit-findings-list']);
  }
  auditChecklist(){
    this.router.navigate(['/audit-checklist']);
  }
}
