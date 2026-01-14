/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { AuditCategoryMasterService } from './audit-category-master-service.service';

describe('Service: AuditCategoryMasterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuditCategoryMasterService]
    });
  });

  it('should ...', inject([AuditCategoryMasterService], (service: AuditCategoryMasterService) => {
    expect(service).toBeTruthy();
  }));
});
