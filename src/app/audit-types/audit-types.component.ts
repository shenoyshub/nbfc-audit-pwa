import { Component, OnInit } from '@angular/core';
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
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    LeftsidebarComponent,

],
})
export class AuditTypesComponent implements OnInit {
     isExpanded = false;
     toggleSideMenu() {
    this.isExpanded = !this.isExpanded;
  }
   auditForm : FormGroup;
   showForm = false;
  constructor(private fb: FormBuilder) {
    this.auditForm  = this.fb.group({
      audit_Type: ['', Validators.required],
       audit_Frequency: ['', Validators.required],
       audit_Branch : ['']

    });
   }

  ngOnInit() {
  }


  onSubmit() {
    if (this.auditForm .valid) {
      console.log('Form submitted:', this.auditForm .value);
      this.auditForm .reset();
      this.showForm = false;

      // Trigger menu close manually if needed: document.querySelector('.cdk-overlay-pane')?.dispatchEvent(new MouseEvent('click'));
    }
  }

}
