import { TestBed } from '@angular/core/testing';

import { PlanningAdminService } from './planning-admin.service';

describe('PlanningAdminService', () => {
  let service: PlanningAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanningAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
