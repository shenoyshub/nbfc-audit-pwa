import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LeftsidebarComponent } from '../leftsidebar/leftsidebar.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-audit-configuration',
  templateUrl: './audit-configuration.component.html',
  styleUrls: ['./audit-configuration.component.css'],
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
     MatDialogModule,

],
})
export class AuditConfigurationComponent implements OnInit {
 @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  isExpanded = false;
     toggleSideMenu() {
    this.isExpanded = !this.isExpanded;
  }
  auditForm : FormGroup;
   showForm = false;
   usersgroup: string[] = [
    'RBI',
    'MCA',
    'Income Tax'
  ];

   selectedUsers: string[] = [];
  constructor(private fb: FormBuilder , private readonly dialog: MatDialog) {
    this.auditForm  = this.fb.group({
      groupName: ['', Validators.required],

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
  // modalDialogBox

 openDialog() {
    this.dialog.open(this.dialogTemplate, {
      width: '90%',
      disableClose: true
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }

}
