import { CategoryMaster } from "./findings-master";

export interface AuditFindings {
  id: string;
  auditId: string;
  branchId: string;
  findingsType: string;//code from CategoryMaster
  severity: string;//code from CategoryMaster
  observation: string;
  recommendation: string;
  amountInvolved?: number;
  status: string; //code from CategoryMaster
  createdOn: string;
  createdBy: string;
  isSynced: boolean;
  syncedOn?: string;
}
