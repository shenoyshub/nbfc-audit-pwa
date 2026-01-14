import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CategoryMaster } from '../models/findings-master';
import { openDB, DBSchema } from 'idb';




@Injectable({
  providedIn: 'root'
})
export class AuditCategoryMasterService {

 private findingsStore: CategoryMaster[] = [];



  getFindingsCategories(): Observable<CategoryMaster[]> {
  return of([
    new CategoryMaster({ id: 1, code: 'COMPLIANCE', description: 'Regulatory & Compliance', order: 1, active: true, selected: false }),
    new CategoryMaster({ id: 2, code: 'CREDIT', description: 'Credit & Lending', order: 2, active: true, selected: false }),
    new CategoryMaster({ id: 3, code: 'FINANCIAL', description: 'Financial & Accounting', order: 3, active: true, selected: false }),
    new CategoryMaster({ id: 4, code: 'GOLD_LOAN', description: 'Gold Loan & Asset Backed', order: 4, active: true, selected: false }),
    new CategoryMaster({ id: 5, code: 'OPERATIONAL', description: 'Operational & Process', order: 5, active: true, selected: false }),
    new CategoryMaster({ id: 6, code: 'IT', description: 'IT & Systems', order: 6, active: true, selected: false }),
    new CategoryMaster({ id: 7, code: 'RISK', description: 'Risk Management', order: 7, active: true, selected: false }),
    new CategoryMaster({ id: 8, code: 'FRAUD', description: 'Fraud & Vigilance', order: 8, active: true, selected: false }),
    new CategoryMaster({ id: 9, code: 'GOVERNANCE', description: 'Governance & HR', order: 9, active: true, selected: false }),
    new CategoryMaster({ id: 10, code: 'CUSTOMER', description: 'Customer & Legal', order: 10, active: true, selected: false })
  ]);
}


getFindingsTypes(): Observable<CategoryMaster[]> {
  return of([
    // Compliance
    new CategoryMaster({ id: 101, code: 'REGULATORY_COMPLIANCE', description: 'RBI / Regulatory Non-Compliance', order: 1, active: true, selected: false }),
    new CategoryMaster({ id: 102, code: 'KYC_AML', description: 'KYC / AML Non-Compliance', order: 2, active: true, selected: false }),
    new CategoryMaster({ id: 103, code: 'PRUDENTIAL_NORMS', description: 'Prudential Norms Violation', order: 3, active: true, selected: false }),

    // Credit
    new CategoryMaster({ id: 201, code: 'CREDIT_APPRAISAL', description: 'Improper Credit Appraisal', order: 4, active: true, selected: false }),
    new CategoryMaster({ id: 202, code: 'LOAN_DOCUMENTATION', description: 'Defective / Missing Loan Documentation', order: 5, active: true, selected: false }),
    new CategoryMaster({ id: 203, code: 'NPA_IDENTIFICATION', description: 'Incorrect NPA Identification', order: 6, active: true, selected: false }),

    // Financial
    new CategoryMaster({ id: 301, code: 'INCOME_RECOGNITION', description: 'Incorrect Income Recognition', order: 7, active: true, selected: false }),
    new CategoryMaster({ id: 302, code: 'PROVISIONING', description: 'Short / Excess Provisioning', order: 8, active: true, selected: false }),
    new CategoryMaster({ id: 303, code: 'RECONCILIATION', description: 'Bank / GL Reconciliation Issues', order: 9, active: true, selected: false }),

    // Gold Loan
    new CategoryMaster({ id: 401, code: 'GOLD_PURITY', description: 'Gold Purity Mismatch', order: 10, active: true, selected: false }),
    new CategoryMaster({ id: 402, code: 'GOLD_WEIGHT', description: 'Gold Weight Difference', order: 11, active: true, selected: false }),
    new CategoryMaster({ id: 403, code: 'GOLD_STOCK_MISMATCH', description: 'Physical vs System Gold Stock Mismatch', order: 12, active: true, selected: false }),

    // Operations
    new CategoryMaster({ id: 501, code: 'PROCESS_DEVIATION', description: 'Process / SOP Deviation', order: 13, active: true, selected: false }),
    new CategoryMaster({ id: 502, code: 'AUTHORIZATION_CONTROL', description: 'Maker-Checker / Authorization Lapse', order: 14, active: true, selected: false }),

    // IT
    new CategoryMaster({ id: 601, code: 'IT_CONTROLS', description: 'IT General Control Weakness', order: 15, active: true, selected: false }),
    new CategoryMaster({ id: 602, code: 'AUDIT_TRAIL', description: 'Missing / Inadequate Audit Trail', order: 16, active: true, selected: false }),

    // Risk
    new CategoryMaster({ id: 701, code: 'ALM_MISMATCH', description: 'Asset-Liability Mismatch', order: 17, active: true, selected: false }),

    // Fraud
    new CategoryMaster({ id: 801, code: 'FRAUD_INDICATORS', description: 'Fraud Indicators Ignored', order: 18, active: true, selected: false }),

    // Governance
    new CategoryMaster({ id: 901, code: 'POLICY_GAP', description: 'Missing / Outdated Policy', order: 19, active: true, selected: false }),

    // Customer
    new CategoryMaster({ id: 1001, code: 'CUSTOMER_GRIEVANCE', description: 'Customer Grievance Handling Issue', order: 20, active: true, selected: false })
  ]);
}


getAuditTypes(): Observable<CategoryMaster[]> {
  return of([
    new CategoryMaster({ id: 1, code: 'INTERNAL_AUDIT', description: 'Internal Audit', order: 1, active: true, selected: false }),
    new CategoryMaster({ id: 2, code: 'STATUTORY_AUDIT', description: 'Statutory Audit', order: 2, active: true, selected: false }),
    new CategoryMaster({ id: 3, code: 'RBI_INSPECTION', description: 'RBI Inspection / Supervisory Review', order: 3, active: true, selected: false }),
    new CategoryMaster({ id: 4, code: 'CONCURRENT_AUDIT', description: 'Concurrent Audit', order: 4, active: true, selected: false }),
    new CategoryMaster({ id: 5, code: 'SYSTEM_AUDIT', description: 'System / IT Audit', order: 5, active: true, selected: false }),
    new CategoryMaster({ id: 6, code: 'CREDIT_AUDIT', description: 'Credit Audit', order: 6, active: true, selected: false }),
    new CategoryMaster({ id: 7, code: 'RISK_BASED_AUDIT', description: 'Risk-Based Audit', order: 7, active: true, selected: false }),
    new CategoryMaster({ id: 8, code: 'COMPLIANCE_AUDIT', description: 'Compliance Audit', order: 8, active: true, selected: false }),
    new CategoryMaster({ id: 9, code: 'GOLD_PURITY_AUDIT', description: 'Gold Purity Audit', order: 9, active: true, selected: false }),
    new CategoryMaster({ id: 10, code: 'GOLD_STOCK_AUDIT', description: 'Gold Stock Audit', order: 10, active: true, selected: false }),
    new CategoryMaster({ id: 11, code: 'FINANCIAL_AUDIT', description: 'Financial Audit', order: 11, active: true, selected: false }),
    new CategoryMaster({ id: 12, code: 'FORENSIC_AUDIT', description: 'Forensic Audit', order: 12, active: true, selected: false }),
    new CategoryMaster({ id: 13, code: 'SPECIAL_AUDIT', description: 'Special Audit', order: 13, active: true, selected: false }),
    new CategoryMaster({ id: 14, code: 'BRANCH_AUDIT', description: 'Branch Audit', order: 14, active: true, selected: false }),
    new CategoryMaster({ id: 15, code: 'PROCESS_AUDIT', description: 'Process Audit', order: 15, active: true, selected: false })
  ]);
}


getAccountTypes(): Observable<CategoryMaster[]> {
  return of([
    // Customer Loan Accounts
    new CategoryMaster({ id: 1, code: 'GOLD_LOAN_ACCOUNT', description: 'Gold Loan Account', order: 1, active: true, selected: false }),
    new CategoryMaster({ id: 2, code: 'PERSONAL_LOAN_ACCOUNT', description: 'Personal Loan Account', order: 2, active: true, selected: false }),
    new CategoryMaster({ id: 3, code: 'BUSINESS_LOAN_ACCOUNT', description: 'Business Loan Account', order: 3, active: true, selected: false }),
    new CategoryMaster({ id: 4, code: 'VEHICLE_LOAN_ACCOUNT', description: 'Vehicle Loan Account', order: 4, active: true, selected: false }),
    new CategoryMaster({ id: 5, code: 'MICROFINANCE_LOAN_ACCOUNT', description: 'Microfinance / JLG Loan Account', order: 5, active: true, selected: false }),
    new CategoryMaster({ id: 6, code: 'HOUSING_LOAN_ACCOUNT', description: 'Housing Loan Account', order: 6, active: true, selected: false }),

    // Gold Loan Sub-Types
    new CategoryMaster({ id: 11, code: 'AGRICULTURAL_GOLD_LOAN', description: 'Agricultural Gold Loan Account', order: 11, active: true, selected: false }),
    new CategoryMaster({ id: 12, code: 'NON_AGRICULTURAL_GOLD_LOAN', description: 'Non-Agricultural Gold Loan Account', order: 12, active: true, selected: false }),

    // Interest & Status Based
    new CategoryMaster({ id: 21, code: 'NPA_LOAN_ACCOUNT', description: 'NPA Loan Account', order: 21, active: true, selected: false }),
    new CategoryMaster({ id: 22, code: 'RESTRUCTURED_LOAN_ACCOUNT', description: 'Restructured Loan Account', order: 22, active: true, selected: false }),
    new CategoryMaster({ id: 23, code: 'OVERDUE_LOAN_ACCOUNT', description: 'Overdue Loan Account', order: 23, active: true, selected: false }),

    // Internal / Operational Accounts
    new CategoryMaster({ id: 31, code: 'CASH_ACCOUNT', description: 'Cash Account', order: 31, active: true, selected: false }),
    new CategoryMaster({ id: 32, code: 'BANK_ACCOUNT', description: 'Bank Account', order: 32, active: true, selected: false }),
    new CategoryMaster({ id: 33, code: 'INTER_BRANCH_ACCOUNT', description: 'Inter-Branch Account', order: 33, active: true, selected: false }),
    new CategoryMaster({ id: 34, code: 'SUSPENSE_ACCOUNT', description: 'Suspense Account', order: 34, active: true, selected: false }),

    // Income / Expense / GL
    new CategoryMaster({ id: 41, code: 'INTEREST_INCOME_ACCOUNT', description: 'Interest Income Account', order: 41, active: true, selected: false }),
    new CategoryMaster({ id: 42, code: 'PROCESSING_FEE_ACCOUNT', description: 'Processing Fee Account', order: 42, active: true, selected: false }),
    new CategoryMaster({ id: 43, code: 'PENAL_INTEREST_ACCOUNT', description: 'Penal Interest Account', order: 43, active: true, selected: false }),
    new CategoryMaster({ id: 44, code: 'OPERATING_EXPENSE_ACCOUNT', description: 'Operating Expense Account', order: 44, active: true, selected: false }),

    // Regulatory / Control
    new CategoryMaster({ id: 51, code: 'PROVISION_ACCOUNT', description: 'Loan Loss Provision Account', order: 51, active: true, selected: false }),
    new CategoryMaster({ id: 52, code: 'CAPITAL_ACCOUNT', description: 'Capital / Net Worth Account', order: 52, active: true, selected: false }),
    new CategoryMaster({ id: 53, code: 'RESERVE_ACCOUNT', description: 'Statutory / General Reserve Account', order: 53, active: true, selected: false })
  ]);
}


getSeverityStatuses(): Observable<CategoryMaster[]> {
  return of([
    new CategoryMaster({ id: 1, code: 'LOW', description: 'Low', order: 1, active: true, selected: false }),
    new CategoryMaster({ id: 2, code: 'MEDIUM', description: 'Medium', order: 2, active: true, selected: false }),
    new CategoryMaster({ id: 3, code: 'HIGH', description: 'High', order: 3, active: true, selected: false }),
    new CategoryMaster({ id: 4, code: 'CRITICAL', description: 'Critical', order: 4, active: true, selected: false })
  ]);
}

getAuditStatuses(): Observable<CategoryMaster[]> {
  return of([
    new CategoryMaster({ id: 1,  code: 'SCHEDULED',              description: 'Scheduled',                 order: 1,  active: true, selected: false }),
    new CategoryMaster({ id: 2,  code: 'RESCHEDULED',            description: 'Rescheduled',               order: 2,  active: true, selected: false }),
    new CategoryMaster({ id: 3,  code: 'OPEN',                   description: 'Open',                      order: 3,  active: true, selected: false }),
    new CategoryMaster({ id: 4,  code: 'IN_PROGRESS',            description: 'In Progress',               order: 4,  active: true, selected: false }),
    new CategoryMaster({ id: 5,  code: 'COMPLETED',              description: 'Completed',                 order: 5,  active: true, selected: false }),
    new CategoryMaster({ id: 6,  code: 'VERIFICATION_PENDING',   description: 'Verification Pending',      order: 6,  active: true, selected: false }),
    new CategoryMaster({ id: 6,  code: 'UNDER_REVIEW',           description: 'Under Review',              order: 6,  active: true, selected: false }),
    new CategoryMaster({ id: 7,  code: 'ACTION_REQUIRED',        description: 'Action Required',           order: 7,  active: true, selected: false }),
    new CategoryMaster({ id: 8,  code: 'ACTION_PLAN_SUBMITTED',  description: 'Action Plan Submitted',     order: 8,  active: true, selected: false }),
    new CategoryMaster({ id: 9,  code: 'ACTION_PLAN_COMPLETED',  description: 'Action Plan Completed',     order: 9,  active: true, selected: false }),
    new CategoryMaster({ id: 10, code: 'PARTIALLY_CLOSED',       description: 'Partially Closed',          order: 10, active: true, selected: false }),
    new CategoryMaster({ id: 11, code: 'CLOSED',                 description: 'Closed',                    order: 11, active: true, selected: false }),
    new CategoryMaster({ id: 12, code: 'REOPENED',               description: 'Reopened',                  order: 12, active: true, selected: false }),
    new CategoryMaster({ id: 13, code: 'REJECTED',               description: 'Rejected',                  order: 13, active: true, selected: false })
  ]);
}

getObservationTypes(): Observable<CategoryMaster[]> {
  return of([
    new CategoryMaster({ id: 1, code: 'NON_COMPLIANCE', description: 'Non-Compliance', order: 1, active: true, selected: false }),
    new CategoryMaster({ id: 2, code: 'PARTIAL_COMPLIANCE', description: 'Partial Compliance', order: 2, active: true, selected: false }),
    new CategoryMaster({ id: 3, code: 'CONTROL_WEAKNESS', description: 'Control Weakness', order: 3, active: true, selected: false }),
    new CategoryMaster({ id: 4, code: 'PROCESS_GAP', description: 'Process Gap', order: 4, active: true, selected: false }),
    new CategoryMaster({ id: 5, code: 'POLICY_DEVIATION', description: 'Policy Deviation', order: 5, active: true, selected: false }),
    new CategoryMaster({ id: 6, code: 'DOCUMENTATION_ISSUE', description: 'Documentation Issue', order: 6, active: true, selected: false }),
    new CategoryMaster({ id: 7, code: 'SYSTEM_ISSUE', description: 'System / Application Issue', order: 7, active: true, selected: false }),
    new CategoryMaster({ id: 8, code: 'DATA_MISMATCH', description: 'Data Mismatch / Reconciliation Issue', order: 8, active: true, selected: false }),
    new CategoryMaster({ id: 9, code: 'DELAY', description: 'Delay / Timeliness Issue', order: 9, active: true, selected: false }),
    new CategoryMaster({ id: 10, code: 'BEST_PRACTICE', description: 'Best Practice / Improvement Opportunity', order: 10, active: true, selected: false })
  ]);
}

}
