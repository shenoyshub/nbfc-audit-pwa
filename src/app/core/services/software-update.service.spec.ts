/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SoftwareUpdateService } from './software-update.service';

describe('Service: SoftwareUpdate', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoftwareUpdateService]
    });
  });

  it('should ...', inject([SoftwareUpdateService], (service: SoftwareUpdateService) => {
    expect(service).toBeTruthy();
  }));
});
