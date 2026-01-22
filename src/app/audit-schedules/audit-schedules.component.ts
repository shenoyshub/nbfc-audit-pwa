import { Component, OnInit, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { LeftsidebarComponent } from '../leftsidebar/leftsidebar.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-audit-schedules',
  templateUrl: './audit-schedules.component.html',
  styleUrls: ['./audit-schedules.component.css'],
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
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    LeftsidebarComponent,
    MatSlideToggleModule,
     MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule ,
    MatPaginatorModule,

    ],
})
export class AuditSchedulesComponent implements OnInit {
     isExpanded = false;
     toggleSideMenu() {
    this.isExpanded = !this.isExpanded;
  }
   auditForm : FormGroup;
   showForm = false;
    selectedDate: Date | null = null;
     displayedColumns: string[] = ['audittype', 'period', 'auditor', 'checklist','zone','branch','actions'];
      dataSource = new MatTableDataSource<AUDITSCHEDULE>([
    { audittype: 'Internal Audit', period: 'Nov 15, 2024 - Nov 29, 2024', auditor: "Amal", checklist : "Gold audit stock" , zone : "Hyderabad", branch :"Akkulam" },
    { audittype: 'Internal Audit', period: 'Nov 15, 2024 - Nov 29, 2024', auditor: "Amal", checklist : "Gold audit stock" , zone : "Hyderabad", branch :"Akkulam" },
    { audittype: 'Internal Audit', period: 'Nov 15, 2024 - Nov 29, 2024', auditor: "Amal", checklist : "Gold audit stock" , zone : "Hyderabad", branch :"Akkulam" },
    { audittype: 'Internal Audit', period: 'Nov 15, 2024 - Nov 29, 2024', auditor: "Amal", checklist : "Gold audit stock" , zone : "Hyderabad", branch :"Akkulam" },
    { audittype: 'Internal Audit', period: 'Nov 15, 2024 - Nov 29, 2024', auditor: "Amal", checklist : "Gold audit stock" , zone : "Hyderabad", branch :"Akkulam" }

  ]);

  constructor(private fb: FormBuilder) {
    this.auditForm  = this.fb.group({
        Zone : [''] ,
       Branch : [''],
      AuditType: ['', Validators.required],
       Auditee: ['', Validators.required],
       LeadAuditor : [''],
       AuditAssociates : ['']



    });
   }

  ngOnInit() {
  }

    @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

   onAddClick(): void{
      // this.showForm = !this.showForm;

         this.showForm = !this.showForm;

   }
  onSubmit(): void {

    if (this.auditForm .valid) {

      this.auditForm .reset();

            this.showForm = false;

    }
  }


}
interface AUDITSCHEDULE {
  audittype: string;
  period: string;
  auditor: string;
  checklist : string;
  zone : string;
  branch : string;
}
