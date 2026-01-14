import { DBSchema } from "idb";
import { AuditFindings } from "../models/audit-findings";

export interface AuditDB extends DBSchema {
  findings: {
    key: string; // id of finding
    value: AuditFindings;
    indexes: { 'by-audit': string }; // if you want to filter by auditId
  };
}