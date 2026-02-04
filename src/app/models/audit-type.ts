export interface AuditType {
  auditTypeCode: string;
  auditTypeName: string;
  categoryCode: string;
  objective: string;
  frequencyCode: string;
  mandatory: boolean;
  regulators: string[];
}