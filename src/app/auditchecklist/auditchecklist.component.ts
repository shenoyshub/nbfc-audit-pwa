import { Component, OnInit ,TemplateRef, ViewChild} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule ,FormArray } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LeftsidebarComponent } from '../leftsidebar/leftsidebar.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-auditchecklist',
  templateUrl: './auditchecklist.component.html',
  styleUrls: ['./auditchecklist.component.css'],
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
export class AuditchecklistComponent implements OnInit {
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  form!: FormGroup;

  options = ['Rating', 'Descriptive', 'Yes / No'];

   isExpanded = false;
     toggleSideMenu() {
    this.isExpanded = !this.isExpanded;
  }
  auditForm : FormGroup;
   showForm = false;
    constructor(private fb: FormBuilder , private readonly dialog: MatDialog) {
    this.auditForm  = this.fb.group({
      ChecklistName: ['', Validators.required],

       AuditType : ['']

    });


    //  array form

     this.form = this.fb.group({
      headerName : [''],
      items: this.fb.array([])
    });

    // start with one row
    this.addItem();
   }
   get items(): FormArray {
    return this.form.get('items') as FormArray;
  }
   addItem() {
    this.items.push(
      this.fb.group({
        name: [''],
        type: ['']
      })
    );
  }

  removeItem(index: number) {
    this.items.removeAt(index);
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
      width: '400px',
      disableClose: true
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }


}
