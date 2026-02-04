export interface AuditType {
  auditCode: string;
  auditName: string;
  auditTypeCode: string;
  auditDescription: string;
  auditStartDate: string;
  auditDueDate: string;
  auditEndedDate?: string;
  assignedAuditors: AuditStaff[];
  auditTasks:TaskType

}