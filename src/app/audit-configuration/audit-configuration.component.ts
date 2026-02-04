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
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';


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
     FormsModule,
     MatCheckboxModule,
      MatRadioModule,

],
})
export class AuditConfigurationComponent implements OnInit {

// new code
steps = [
  {
    id: 1,
    title: 'Identity',
    subtitle: 'Basic audit details'
  },
  {
    id: 2,
    title: 'Methodology',
    subtitle: 'Audit approach & checks'
  },
   {
    id: 3,
    title: 'Scope',
    subtitle: 'REntity Mapping'
  },
  {
    id: 4,
    title: 'Scoring',
    subtitle: 'Risk & weightage'
  },
  {
    id: 5,
    title: 'Workflow',
    subtitle: 'Approvals & SLA'
  }
];

currentStep = 1;
isCompleted(stepId: number): boolean {
  return stepId < this.currentStep;
}
  next() {
    if (this.currentStep < 5) {
      this.currentStep++;
    }
  }

  previous() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  saveDraft() {
    alert('Draft saved!');
  }

  closeStepper() {
    alert('Stepper closed!');
  }



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
     width: '95vw',
      height: '95vh',
      maxWidth: '100vw',
      panelClass: 'full-screen-dialog',
      disableClose: false
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }
//  step2
selectedEvidence = 'vouchers';
  evidenceList = [
  {
    value: 'vouchers',
    title: 'Vouchers',
    subtitle: 'Payment vouchers, JV receipts',
    icon: 'receipt_long',
    iconBg: 'bg-danger text-white',
    priority: 'High',
    badgeClass: 'bg-danger',
     selected: true
  },
  {
    value: 'deposits',
    title: 'Deposits',
    subtitle: 'Account opening, FD receipts',
    icon: 'account_balance',
    iconBg: 'bg-primary text-white',
    priority: 'High',
    badgeClass: 'bg-primary',
     selected: true
  },
  {
    value: 'loans',
    title: 'Loans',
    subtitle: 'Loan agreements, collateral docs',
    icon: 'account_balance',
    iconBg: 'bg-primary text-white',
    priority: 'High',
    badgeClass: 'bg-primary',
     selected: true
  }
];

  samplingType = 'systematic';

  samplingOptions = [
    {
      value: 'systematic',
      title: 'Systematic Sampling',
      desc: 'Interval-based statistical selection'
    },
    {
      value: '100',
      title: '100% Verification',
      desc: 'Complete population check'
    },
    {
      value: 'risk',
      title: 'Risk-based Sampling',
      desc: 'High-risk & high-value items'
    },
    {
      value: 'random',
      title: 'Random Sampling',
      desc: 'Simple random selection'
    }
  ];

  toggleEvidence(item: any) {
    item.selected = !item.selected;
  }

  get selectedEvidenceText(): string {
    const selected = this.evidenceList
      .filter(e => e.selected)
      .map(e => e.title);
    return selected.length ? `Selected: ${selected.join(', ')}` : 'None';
  }
  // step3
  departments = [
  { name: 'Retail Banking', desc: 'Deposits & Loans', selected: true },
  { name: 'Treasury', desc: 'Forex & Investments', selected: true },
  { name: 'Gold Loan', desc: 'Jewel Appraisal', selected: false },
  { name: 'Human Resources', desc: 'Payroll & Admin', selected: false },
  { name: 'Trade Finance', desc: 'LCs & Guarantees', selected: true },
  { name: 'Digital Banking', desc: 'IT & Cybersecurity', selected: false }
];
// step 5
scoringType: 'percentage' | 'points' = 'percentage';
// step 6
 selectedWorkflow: 'auditor' | 'branch' | 'regional' | 'ho' = 'auditor';
 sla = {
    daysToRespond: 3,
    daysToClose: 15
  };

  notifications = {
    email: true,
    sms: true,
    digest: false
  };

  changeRespondDays(value: number) {
    this.sla.daysToRespond = Math.max(0, this.sla.daysToRespond + value);
  }

  changeCloseDays(value: number) {
    this.sla.daysToClose = Math.max(0, this.sla.daysToClose + value);
  }

}
