import { ChangeDetectorRef, Component, OnInit, signal, Signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { AuditCategoryMasterService } from '../core/services/audit-category-master-service.service';
import { CategoryMaster } from '../core/models/findings-master';
import { CommonModule } from '@angular/common';
import { AuditFindingsStore } from '../core/services/audit-findings-store';
import { AuditFindings } from '../core/models/audit-findings';
import { Router } from '@angular/router';

@Component({
  selector: 'app-audit-findings',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './audit-findings.component.html',
  styleUrls: ['./audit-findings.component.scss']
})
export class AuditFindingsComponent implements OnInit {

  findingsForm!: FormGroup;



  findingsTypes: CategoryMaster[] = [];
  severities: CategoryMaster[] = [];
  observations: CategoryMaster[] = [];
  statuses: CategoryMaster[] = [];
  auditId: string='';

  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private store: AuditFindingsStore,
    private masterService: AuditCategoryMasterService,
    private router: Router

  ) { }

  ngOnInit(): void {
    // Initialize the form AFTER fb is available
    this.initializeForm();

    this.loadMasterData();
  }

  initializeForm() {
    this.findingsForm = this.fb.group({
      auditId: [uuid()],
      branchId: [''],
      findingsType: ['', Validators.required],
      severity: ['', Validators.required],
      status: ['OPEN', Validators.required],
      observations: [[], [Validators.required, Validators.minLength(1)]],
      correctiveAction: [''],
      recommendation: [''],
      amountInvolved: [0]
    });
  }
  loadMasterData() {
    // Load master data
    this.masterService.getFindingsTypes().subscribe(
     d=>{ this.findingsTypes=d ; this.cdr.detectChanges(); }
    );
    this.masterService.getSeverityStatuses().subscribe(
    d=>{ this.severities=d ; this.cdr.detectChanges(); }
    );
    this.masterService.getObservationTypes().subscribe(
     d=>{ this.observations=d ; this.cdr.detectChanges(); }
    );
    this.masterService.getAuditStatuses().subscribe(
       d=>{ this.statuses=d ; this.cdr.detectChanges(); }
    );

  }
 logValidationErrors() {
  const form = this.findingsForm;
  
  Object.keys(form.controls).forEach(key => {
    const controlErrors = form.get(key)?.errors;
    if (controlErrors != null) {
      Object.keys(controlErrors).forEach(keyError => {
        console.error(
          `Control: ${key}, Error: ${keyError}, Value:`, 
          controlErrors[keyError]
        );
      });
    }
  });
}
handleFormInputChanges(){
  this.cdr.detectChanges();
}
  // Save to IndexedDB
  async saveFindings() {
    console.log('Saving findings...');
    if (this.findingsForm.invalid) {
      this.findingsForm.markAllAsTouched();
      console.error('Form is invalid');
      return;
    }
    console.log(this.findingsForm.value);
    const finding: AuditFindings = {
      id: uuid(),
      auditId: this.findingsForm.value.auditId,
      branchId: this.findingsForm.value.branchId,
      findingsType: this.findingsForm.value.findingsType,
      severity: this.findingsForm.value.severity,
      status: this.findingsForm.value.status || 'OPEN',
      observation: this.findingsForm.value.observation,
      recommendation: this.findingsForm.value.recommendation || '',
      amountInvolved: this.findingsForm.value.amountInvolved || 0,
      createdOn: new Date().toISOString(),
      createdBy: 'AUDITOR01',
      isSynced: false
    };

    await this.store.save(finding);

    alert('Audit Finding saved offline ✔');
   
      // 3. Redirect to the list
    this.closeForm();

  }
  async removeFindings(id: string){
    await this.store.deleteFinding(id);
  }
  closeForm(){
    this.router.navigate(['/audit-findings-list']);
  }
  onObservationChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const selected: string[] = this.findingsForm.get('observations')?.value || [];

    if (checkbox.checked) {
      if (!selected.includes(checkbox.value)) {
        selected.push(checkbox.value);
      }
    } else {
      const index = selected.indexOf(checkbox.value);
      if (index >= 0) {
        selected.splice(index, 1);
      }
    }

    this.findingsForm.get('observations')?.setValue(selected);
  }
  uuid() {
    return uuid();
  }
}
