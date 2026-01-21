import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { LeftsidebarComponent } from '../leftsidebar/leftsidebar.component';
@Component({
  selector: 'app-audit-types',
  templateUrl: './audit-types.component.html',
  styleUrls: ['./audit-types.component.css'],
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
    MatCardModule,
    LeftsidebarComponent
],
})
export class AuditTypesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
