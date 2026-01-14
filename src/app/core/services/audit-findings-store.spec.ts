import { TestBed } from '@angular/core/testing';

import { AuditFindingsStore } from './audit-findings-store';

describe('AuditFindingsStore', () => {
  let service: AuditFindingsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditFindingsStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
