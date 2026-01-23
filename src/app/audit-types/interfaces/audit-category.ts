import { AuditType } from "./audit-type";

export interface AuditCategory {
    id: number;
    name: string;
    auditTypes: AuditType[];
}