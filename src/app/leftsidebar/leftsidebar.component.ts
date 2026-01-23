import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

// Angular Material imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-leftsidebar',
  standalone: true,
  templateUrl: './leftsidebar.component.html',
  styleUrls: ['./leftsidebar.component.css'],
  imports: [
    CommonModule,
   // RouterLink,        // <-- Needed if you use routerLink in the template
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatGridListModule
  ]
})
export class LeftsidebarComponent implements OnInit {
  private router = inject(Router);
  
  isExpanded = false;

  constructor() {}

  ngOnInit(): void {}

  toggleSideMenu(): void {
    this.isExpanded = !this.isExpanded;
  }

  // Navigation methods
  auditDashboard(): void {
    this.router.navigate(['/audit-dashboard']);
  }

  auditType(): void {
    this.router.navigate(['/audit-types']);
  }

  auditors(): void {
    this.router.navigate(['/auditors']);
  }

  auditSchedules(): void {
    this.router.navigate(['/audit-schedules']);
  }

  auditFindings(): void {
    this.router.navigate(['/audit-findings-list']);
  }
}
