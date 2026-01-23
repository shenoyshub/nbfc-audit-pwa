import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { LeftsidebarComponent } from '../leftsidebar/leftsidebar.component';

import { AuditTypeList } from './interfaces/audit-type-list';
import { AUDIT_CATEGORIES } from './audit-types-data/audit-categories.data';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-audit-types',
  standalone: true,
  templateUrl: './audit-types.component.html',
  styleUrls: ['./audit-types.component.scss'],
  imports: [
     CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatFormFieldModule,  // ✅ Add this
    MatInputModule,      // ✅ Add this
    MatSelectModule,     // ✅ Add this
    LeftsidebarComponent
  ]
})
export class AuditTypesComponent implements OnInit {

  isExpanded = false;
  showForm = false;

  viewMode: 'card' | 'grid' = 'card';

  auditForm: FormGroup;

  auditTypeList!: AuditTypeList;

  constructor(private fb: FormBuilder) {
    this.auditForm = this.fb.group({
      audit_Type: ['', Validators.required],
      audit_Frequency: ['', Validators.required],
      audit_Branch: ['']
    });
  }

  ngOnInit(): void {
    this.auditTypeList = {
      id: 1,
      auditCategories: AUDIT_CATEGORIES
    };
  }

  toggleSideMenu(): void {
    this.isExpanded = !this.isExpanded;
  }

  onSubmit(): void {
    if (this.auditForm.valid) {
      console.log('Form submitted:', this.auditForm.value);
      this.auditForm.reset();
      this.showForm = false;
    }
  }

  editAudit(id: number): void {
    console.log('Edit audit:', id);
  }

  deleteAudit(id: number): void {
    console.log('Delete audit:', id);
  }
  cancelForm(): void {
    this.showForm = false;
    this.auditForm.reset();
  }
}
