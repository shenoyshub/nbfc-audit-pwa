import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuditFindings } from '../core/models/audit-findings';
import { AuditFindingsStore } from '../core/services/audit-findings-store';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-audit-findings-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audit-findings-list.component.html',
  styleUrls: ['./audit-findings-list.component.scss']
})
export class AuditFindingsListComponent implements OnInit {

  private router = inject(Router);

  findings = signal<AuditFindings[]>([]);
  loading = signal(true);

  constructor(
    private cdr: ChangeDetectorRef,
    private store: AuditFindingsStore,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    // const auditId = this.route.snapshot.paramMap.get('auditId');

    // const data = auditId
    //   ? await this.store.getFindings(auditId)
    //   : await this.store.getAllFindings();
    this.LoadFindingsData();


  }
  async LoadFindingsData() {
    const data = await this.store.getAllFindings();
    this.findings.set([]);
    this.loading.set(true);
    this.findings.set(data);
    this.loading.set(false);
  }
  getUUID() {
    return uuidv4();
  }
  goToNewFinding() {
    this.router.navigate(['/audit-findings']);  // Navigate to list
  }
  getSampleFindingsData() {
    const AUDIT_FINDINGS_SAMPLE: AuditFindings[] = [
      {
        id: 'AF-001',
        auditId: 'AUD-2025-001',
        branchId: 'BR-ERKM-01',
        findingsType: 'DOC_NON_COMPLIANCE', // CategoryMaster
        severity: 'HIGH',
        observation: 'Loan sanction documents were missing applicant signatures in 3 sampled files.',
        recommendation: 'Ensure all mandatory signatures are obtained before loan disbursement.',
        amountInvolved: 250000,
        status: 'OPEN',
        createdOn: '2026-01-10T10:15:00Z',
        createdBy: 'auditor01',
        isSynced: false
      },
      {
        id: 'AF-002',
        auditId: 'AUD-2025-001',
        branchId: 'BR-ERKM-01',
        findingsType: 'PROCESS_DEVIATION',
        severity: 'MEDIUM',
        observation: 'KYC re-verification was not performed for 2 customers after the expiry period.',
        recommendation: 'Implement system alerts for KYC expiry and re-verification.',
        status: 'IN_PROGRESS',
        createdOn: '2026-01-10T11:05:00Z',
        createdBy: 'auditor01',
        isSynced: true,
        syncedOn: '2026-01-10T11:10:00Z'
      },
      {
        id: 'AF-003',
        auditId: 'AUD-2025-002',
        branchId: 'BR-KOZH-03',
        findingsType: 'FINANCIAL_IRREGULARITY',
        severity: 'CRITICAL',
        observation: 'Cash balance as per system did not match physical cash during surprise verification.',
        recommendation: 'Conduct immediate reconciliation and fix accountability.',
        amountInvolved: 125000,
        status: 'OPEN',
        createdOn: '2026-01-11T09:45:00Z',
        createdBy: 'auditor02',
        isSynced: false
      },
      {
        id: 'AF-004',
        auditId: 'AUD-2025-002',
        branchId: 'BR-KOZH-03',
        findingsType: 'POLICY_NON_COMPLIANCE',
        severity: 'LOW',
        observation: 'Insurance copies were not filed in the loan document set.',
        recommendation: 'Ensure insurance documents are attached and verified.',
        status: 'CLOSED',
        createdOn: '2026-01-11T10:30:00Z',
        createdBy: 'auditor02',
        isSynced: true,
        syncedOn: '2026-01-11T10:35:00Z'
      },
      {
        id: 'AF-005',
        auditId: 'AUD-2025-003',
        branchId: 'BR-TRIV-02',
        findingsType: 'SYSTEM_CONTROL_WEAKNESS',
        severity: 'MEDIUM',
        observation: 'Same user ID was used for both loan creation and approval.',
        recommendation: 'Enable maker-checker control in the core system.',
        status: 'OPEN',
        createdOn: '2026-01-12T14:20:00Z',
        createdBy: 'auditor03',
        isSynced: false
      }
    ];
    return AUDIT_FINDINGS_SAMPLE;
  }
  async removeFindings(id: string) {
    const isConfirmed = confirm('Remove this finding permanently?');

    if (isConfirmed) {
      // Logic to remove from IndexedDB
      await this.store.deleteFinding(id);
      this.cdr.detectChanges();
      this.LoadFindingsData();
      // Safety check for UI refresh
      this.cdr.detectChanges();
      // Redirect

    }
  }

}
