/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuditCategoryService } from './audit-category.service';

describe('Service: AuditCategory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuditCategoryService]
    });
  });

  it('should ...', inject([AuditCategoryService], (service: AuditCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
