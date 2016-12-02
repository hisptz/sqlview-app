/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrgUnitSqlService } from './org-unit-sql.service';

describe('Service: OrgUnitSql', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrgUnitSqlService]
    });
  });

  it('should ...', inject([OrgUnitSqlService], (service: OrgUnitSqlService) => {
    expect(service).toBeTruthy();
  }));
});
