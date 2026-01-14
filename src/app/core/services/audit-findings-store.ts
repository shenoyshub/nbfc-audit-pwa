import { Injectable } from '@angular/core';
import { openDB, DBSchema } from 'idb';
import { AuditFindings } from '../models/audit-findings';
import { AuditDB } from '../interfaces/audit-db';



@Injectable({ providedIn: 'root' })
export class AuditFindingsStore {

  private dbPromise = openDB<AuditDB>('finance-audit-db', 1, {
    upgrade(db) {
      const store = db.createObjectStore('findings', { keyPath: 'id' });
      store.createIndex('by-audit', 'auditId');
    }
  });

  // -------------------------------
  // ADD / SAVE A FINDING
  // -------------------------------
  async save(findings: AuditFindings): Promise<void> {
    const db = await this.dbPromise;
    await db.put('findings', findings); // put = add or update
  }

    // GET ALL FINDINGS
  // -------------------------------
  async getAllFindings(): Promise<AuditFindings[]> {
    const db = await this.dbPromise;
    return db.getAll('findings');
  }

  // -------------------------------
  // GET FINDINGS AGAINST AN AUDIT
  // -------------------------------
  async getFindings(auditId: string): Promise<AuditFindings[]> {
    const db = await this.dbPromise;
    return db.getAllFromIndex('findings', 'by-audit', auditId);
  }

  // -------------------------------
  // GET UNSYNCED FINDINGS
  // -------------------------------
  async getUnsynced(): Promise<AuditFindings[]> {
    const db = await this.dbPromise;
    const all = await db.getAll('findings');
    return all.filter(f => !f.isSynced);
  }

  // -------------------------------
  // DELETE A FINDING (OPTIONAL)
  // -------------------------------
  async deleteFinding(id: string): Promise<void> {
    const db = await this.dbPromise;
    await db.delete('findings', id);
  }
}
