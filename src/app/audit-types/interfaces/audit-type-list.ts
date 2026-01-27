import { AuditCategory } from "./audit-category";


export interface AuditTypeList {
  id: number;
  auditCategories: AuditCategory[];
}