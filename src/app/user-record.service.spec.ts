import { TestBed } from '@angular/core/testing';

import { UserRecordService } from './user-record.service';

describe('UserRecordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserRecordService = TestBed.get(UserRecordService);
    expect(service).toBeTruthy();
  });
});
